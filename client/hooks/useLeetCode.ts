import { useQuery } from "@tanstack/react-query";
import type { LeetCodeStatsResponse } from "@shared/api";

/**
 * Fetches LeetCode stats from the API
 */
async function fetchLeetCodeStats(username: string): Promise<LeetCodeStatsResponse> {
  const response = await fetch(`/api/leetcode/${encodeURIComponent(username)}`);
  
  if (!response.ok) {
    const error = await response.json().catch(() => ({ error: "Unknown error" }));
    throw new Error(error.error || `Failed to fetch LeetCode stats (${response.status})`);
  }
  
  return response.json();
}

/**
 * React Query hook for fetching LeetCode stats
 * Automatically refetches every 15 minutes
 */
export function useLeetCode(username: string) {
  return useQuery({
    queryKey: ["leetcode", username],
    queryFn: () => fetchLeetCodeStats(username),
    staleTime: 15 * 60 * 1000, // 15 minutes
    refetchInterval: 15 * 60 * 1000, // 15 minutes
    retry: 2,
    enabled: Boolean(username),
  });
}


