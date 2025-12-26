import { generateEmbedding } from "../embeddings/embeddingProvider.js";
import { addVector, searchSimilar } from "../faiss/vectorStore.js";
import { logger } from "../utils/logger.js";

export const ingestRepo = async (repo) => {
  try {
    const text = `
      ${repo.name}
      ${repo.description}
      ${repo.language}
    `;

    const embedding = await generateEmbedding(text);

    addVector(repo.id, embedding, repo);

    logger.info("Repo vectorized:", repo.name);
  } catch (err) {
    logger.error("Vector ingestion failed:", err.message);
  }
};

export const findSimilarRepos = async (query) => {
  const embedding = await generateEmbedding(query);
  return searchSimilar(embedding);
};
