/**
 * Shared code between client and server
 * Useful to share types between client and server
 * and/or small pure JS functions that can be used on both client and server
 */

/**
 * Example response type for /api/demo
 */
export interface DemoResponse {
  message: string;
}

/**
 * LeetCode badge type
 */
export interface LeetCodeBadge {
  id: string;
  name: string;
  icon: string;
}

/**
 * LeetCode stats response type
 */
export interface LeetCodeStatsResponse {
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

/**
 * LeetCode error response
 */
export interface LeetCodeErrorResponse {
  error: string;
}
