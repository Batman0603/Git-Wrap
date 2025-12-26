const vectors = [];

export const addVector = (id, embedding, metadata) => {
  const index = vectors.findIndex((v) => v.id === id);
  if (index !== -1) {
    vectors[index] = { id, embedding, metadata };
  } else {
    vectors.push({ id, embedding, metadata });
  }
};

const cosineSimilarity = (a, b) => {
  const dot = a.reduce((sum, val, i) => sum + val * b[i], 0);
  const magA = Math.sqrt(a.reduce((s, v) => s + v * v, 0));
  const magB = Math.sqrt(b.reduce((s, v) => s + v * v, 0));
  return dot / (magA * magB || 1);
};

export const searchSimilar = (queryEmbedding, topK = 5) => {
  return vectors
    .map(v => ({
      ...v,
      score: cosineSimilarity(queryEmbedding, v.embedding)
    }))
    .sort((a, b) => b.score - a.score)
    .slice(0, topK);
};
