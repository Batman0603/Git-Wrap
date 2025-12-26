export const config = {
  port: process.env.PORT || 5006,
  analysisServiceUrl: process.env.ANALYSIS_URL || "http://localhost:5003",
  vectorServiceUrl: process.env.VECTOR_SERVICE_URL || "http://localhost:5005"
};
