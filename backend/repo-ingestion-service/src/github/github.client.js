import axios from "axios";

export function createGithubClient() {
  if (!process.env.GITHUB_TOKEN) {
    throw new Error("GitHub token missing");
  }

  return axios.create({
    baseURL: "https://api.github.com",
    headers: {
      Accept: "application/vnd.github+json",
      Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
      "User-Agent": "repo-ingestion-service",
    },
  });
}