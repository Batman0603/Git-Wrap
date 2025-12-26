import { getRecommendations } from "../services/recommendation.service.js";

export const recommendRepos = async (req, res) => {
  try {
    const { type = "popular", keyword } = req.query;

    if (!keyword) {
      return res.status(400).json({ error: "Keyword is required" });
    }

    const repos = await getRecommendations({ type, keyword });

    res.json({
      type,
      count: repos.length,
      repos
    });
  } catch (error) {
    console.error("Recommendation error:", error);
    res.status(500).json({ error: "Recommendation service failed" });
  }
};
