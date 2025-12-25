import { ingestReposByTopic } from "../services/repoIngestion.service.js";

export const runIngestionJob = async () => {
  console.log("Starting repo ingestion job...");

  try {
    await ingestReposByTopic("open-source");
    console.log("Repo ingestion completed");
  } catch (err) {
    console.error("Ingestion job failed:", err);
  }
};
