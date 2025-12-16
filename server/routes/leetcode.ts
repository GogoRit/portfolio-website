import { Router } from "express";
import { fetchLeetCodeStats, LeetCodeError } from "../services/leetcode";
import logger from "../logger";

export const leetcodeRouter = Router();

/**
 * GET /api/leetcode/:username
 * Fetches public LeetCode stats for a given username
 */
leetcodeRouter.get("/:username", async (req, res) => {
  const { username } = req.params;

  if (!username || typeof username !== "string") {
    return res.status(400).json({ error: "Username is required" });
  }

  try {
    logger.info(`Fetching LeetCode stats for: ${username}`);
    const stats = await fetchLeetCodeStats(username);
    res.json(stats);
  } catch (error) {
    if (error instanceof LeetCodeError) {
      logger.warn(`LeetCode API error for ${username}: ${error.message}`);
      return res.status(error.statusCode).json({ error: error.message });
    }

    logger.error(`Unexpected error fetching LeetCode stats: ${error}`);
    res.status(500).json({ error: "Internal server error" });
  }
});


