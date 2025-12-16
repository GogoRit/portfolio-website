/**
 * LeetCode API Service
 * Fetches public stats from LeetCode GraphQL API with caching
 */

export interface LeetCodeBadge {
  id: string;
  name: string;
  icon: string;
}

export interface LeetCodeStats {
  username: string;
  ranking: number | null;
  solved: {
    total: number;
    easy: number;
    medium: number;
    hard: number;
  };
  streak: {
    current: number;
    max: number;
  };
  badges: LeetCodeBadge[];
  totalActiveDays: number;
  updatedAt: string;
}

interface LeetCodeGraphQLResponse {
  data?: {
    matchedUser: {
      username: string;
      profile: {
        ranking: number;
      };
      submitStatsGlobal: {
        acSubmissionNum: Array<{
          difficulty: string;
          count: number;
        }>;
      };
      badges: Array<{
        id: string;
        name: string;
        icon: string;
      }>;
    } | null;
    userContestRanking?: {
      rating: number;
    } | null;
  };
  errors?: Array<{ message: string }>;
}

interface StreakResponse {
  data?: {
    matchedUser?: {
      userCalendar?: {
        activeYears: number[];
        streak: number;
        totalActiveDays: number;
      } | null;
    } | null;
  };
  errors?: Array<{ message: string }>;
}

// In-memory cache with TTL
interface CacheEntry {
  data: LeetCodeStats;
  timestamp: number;
}

const cache = new Map<string, CacheEntry>();
const CACHE_TTL_MS = 15 * 60 * 1000; // 15 minutes

const LEETCODE_GRAPHQL_URL = "https://leetcode.com/graphql";

const LEETCODE_QUERY = `
  query getUserProfile($username: String!) {
    matchedUser(username: $username) {
      username
      profile {
        ranking
      }
      submitStatsGlobal {
        acSubmissionNum {
          difficulty
          count
        }
      }
      badges {
        id
        name
        icon
      }
    }
  }
`;

const STREAK_QUERY = `
  query userProfileCalendar($username: String!, $year: Int) {
    matchedUser(username: $username) {
      userCalendar(year: $year) {
        activeYears
        streak
        totalActiveDays
      }
    }
  }
`;

export class LeetCodeError extends Error {
  constructor(
    message: string,
    public statusCode: number
  ) {
    super(message);
    this.name = "LeetCodeError";
  }
}

async function fetchStreakData(username: string): Promise<{ current: number; max: number; totalActiveDays: number }> {
  try {
    const currentYear = new Date().getFullYear();
    const response = await fetch(LEETCODE_GRAPHQL_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Referer": "https://leetcode.com",
        "User-Agent": "Mozilla/5.0 (compatible; PortfolioBot/1.0)",
      },
      body: JSON.stringify({
        query: STREAK_QUERY,
        variables: { username, year: currentYear },
      }),
    });

    if (!response.ok) {
      return { current: 0, max: 0, totalActiveDays: 0 };
    }

    const result: StreakResponse = await response.json();
    
    const userCalendar = result.data?.matchedUser?.userCalendar;
    const streak = userCalendar?.streak || 0;
    const totalActiveDays = userCalendar?.totalActiveDays || 0;

    return {
      current: streak,
      max: streak,
      totalActiveDays,
    };
  } catch {
    return { current: 0, max: 0, totalActiveDays: 0 };
  }
}

export async function fetchLeetCodeStats(username: string): Promise<LeetCodeStats> {
  // Check cache first
  const cached = cache.get(username.toLowerCase());
  if (cached && Date.now() - cached.timestamp < CACHE_TTL_MS) {
    return cached.data;
  }

  try {
    // Fetch main profile data and streak data in parallel
    const [profileResponse, streakData] = await Promise.all([
      fetch(LEETCODE_GRAPHQL_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Referer": "https://leetcode.com",
          "User-Agent": "Mozilla/5.0 (compatible; PortfolioBot/1.0)",
        },
        body: JSON.stringify({
          query: LEETCODE_QUERY,
          variables: { username },
        }),
      }),
      fetchStreakData(username),
    ]);

    if (!profileResponse.ok) {
      throw new LeetCodeError(
        `LeetCode API returned status ${profileResponse.status}`,
        502
      );
    }

    const result: LeetCodeGraphQLResponse = await profileResponse.json();

    if (result.errors && result.errors.length > 0) {
      throw new LeetCodeError(
        `LeetCode GraphQL error: ${result.errors[0].message}`,
        502
      );
    }

    if (!result.data?.matchedUser) {
      throw new LeetCodeError(`User '${username}' not found on LeetCode`, 404);
    }

    const user = result.data.matchedUser;
    const submissions = user.submitStatsGlobal.acSubmissionNum;

    // Parse submission stats
    const solved = {
      total: 0,
      easy: 0,
      medium: 0,
      hard: 0,
    };

    for (const stat of submissions) {
      const count = stat.count || 0;
      switch (stat.difficulty.toLowerCase()) {
        case "all":
          solved.total = count;
          break;
        case "easy":
          solved.easy = count;
          break;
        case "medium":
          solved.medium = count;
          break;
        case "hard":
          solved.hard = count;
          break;
      }
    }

    // Parse badges - ensure icon URLs are absolute
    const badges: LeetCodeBadge[] = (user.badges || []).map((badge) => {
      let iconUrl = badge.icon || "";
      // If icon is a relative URL, prepend LeetCode base URL
      if (iconUrl && !iconUrl.startsWith("http")) {
        iconUrl = `https://leetcode.com${iconUrl.startsWith("/") ? "" : "/"}${iconUrl}`;
      }
      return {
        id: badge.id,
        name: badge.name,
        icon: iconUrl,
      };
    });

    const stats: LeetCodeStats = {
      username: user.username,
      ranking: user.profile?.ranking || null,
      solved,
      streak: {
        current: streakData.current,
        max: streakData.max,
      },
      badges,
      totalActiveDays: streakData.totalActiveDays,
      updatedAt: new Date().toISOString(),
    };

    // Update cache
    cache.set(username.toLowerCase(), {
      data: stats,
      timestamp: Date.now(),
    });

    return stats;
  } catch (error) {
    if (error instanceof LeetCodeError) {
      throw error;
    }
    
    // Network or unexpected errors
    const message = error instanceof Error ? error.message : "Unknown error";
    throw new LeetCodeError(`Failed to fetch LeetCode stats: ${message}`, 502);
  }
}


