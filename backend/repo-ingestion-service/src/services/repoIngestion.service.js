import { createGithubClient } from "../github/github.client.js";
import { isApiRepo } from "../github/github.helpers.js";

export async function ingestReposByKeyword(keyword, page, limit, mode, language) {
  const client = createGithubClient();

  // Strategy Pattern for Search Modes
  const strategies = {
    popular: { sort: "stars", order: "desc" },
    beginner: { sort: "stars", order: "asc" }, // "Opposite" of popular
  };

  const { sort, order } = strategies[mode] || strategies.popular;

  const searchRes = await client.get("/search/repositories", {
    params: {
      q: `${keyword} in:name,description,readme`,
      sort,
      order,
      per_page: limit,
      page
    }
  });

  console.log("GitHub raw total_count:", searchRes.data.total_count);
  console.log("GitHub raw items length:", searchRes.data.items?.length);

  const repos = [];

  for (const repo of searchRes.data.items) {
    // Step 5: Stop filtering for "API repos" (temporarily for debugging)
    if (repo.archived) continue;

    const hasContributing = await checkContributing(
      client,
      repo.owner.login,
      repo.name
    );

    // Step 3: Temporarily REMOVE contributing filter
    // if (!hasContributing) continue;

    repos.push({
      name: repo.name,
      full_name: repo.full_name,
      description: repo.description,
      language: repo.language,
      stars: repo.stargazers_count,
      has_contributing: hasContributing,
      api_type: "REST", // heuristic, refine later
      url: repo.html_url
    });
  }

  return repos;
}

const CONTRIBUTING_PATHS = [
  "CONTRIBUTING.md",
  ".github/CONTRIBUTING.md",
  "docs/CONTRIBUTING.md"
];

async function checkContributing(client, owner, repo) {
  for (const path of CONTRIBUTING_PATHS) {
    try {
      await client.get(`/repos/${owner}/${repo}/contents/${path}`);
      return true;
    } catch (e) {
      // Step 2: Treat 404 as normal, not failure
      if (e.response?.status !== 404) {
        console.error(`GitHub error checking ${path}:`, e.message);
      }
    }
  }
  return false;
}