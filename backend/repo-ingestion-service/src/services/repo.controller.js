import { ingestReposByKeyword } from "../services/repoIngestion.service.js";

export async function searchRepos(req, res) {
  const { keyword, page = 1, limit = 10, mode = "popular", language } = req.query;

  if (!keyword || keyword.length < 2) {
    return res.status(400).json({ error: "Keyword too short" });
  }

  const repos = await ingestReposByKeyword(keyword, page, limit, mode, language);

  res.json({
    keyword,
    count: repos.length,
    repos
  });
}