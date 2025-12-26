import axios from "axios";
import { beginnerFilter } from "../filters/beginner.filter.js";
import { popularFilter } from "../filters/popular.filter.js";
import { defaultRanker } from "../rankers/defaultRanker.js";
import { config } from "../config/index.js";

/**
 * Generates a list of recommended repositories based on a keyword and filter type.
 * @param {Object} params - The parameters for recommendation.
 * @param {string} params.type - The type of filter to apply (e.g., 'beginner', 'popular').
 * @param {string} params.keyword - The search keyword used to query the vector database.
 * @returns {Promise<Array>} A promise that resolves to an array of ranked repository objects.
 */
export const getRecommendations = async ({ type, keyword }) => {
  let repos = [];
  try {
    // Query the Vector Service to find relevant repos based on user interest (keyword)
    const { data } = await axios.post(
      `${config.vectorServiceUrl}/vectors/search`,
      { query: keyword }
    );

    // Extract the repository details from the vector search results (stored in metadata)
    repos = data.map(result => ({
      ...result.metadata,
      // Ensure a URL is present; fallback to a GitHub search if missing
      url: result.metadata.url || `https://github.com/search?q=${result.metadata.name}`
    })) || [];
  } catch (error) {
    console.error("Vector Service unavailable:", error.message);
    repos = [];
  }

  if (type === "beginner") repos = beginnerFilter(repos);
  if (type === "popular") repos = popularFilter(repos);

  return defaultRanker(repos);
};
