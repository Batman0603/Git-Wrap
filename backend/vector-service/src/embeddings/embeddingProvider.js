export const generateEmbedding = async (text) => {
  if (!text) throw new Error("Text is required for embedding");

  // Mock embedding (deterministic-ish)
  const vector = Array.from({ length: 128 }, (_, i) =>
    (text.charCodeAt(i % text.length) || 0) / 255
  );

  return vector;
};
