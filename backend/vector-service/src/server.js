import express from "express";
import { config } from "./config/index.js";
import { ingestRepo, findSimilarRepos } from "./services/vectorService.js";
import { logger } from "./utils/logger.js";

const app = express();
app.use(express.json());

app.post("/vectors/ingest", async (req, res) => {
  await ingestRepo(req.body);
  res.status(200).json({ message: "Repo ingested" });
});

app.post("/vectors/search", async (req, res) => {
  try {
    const { query } = req.body;
    const results = await findSimilarRepos(query);
    res.json(results);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.listen(config.PORT, () => {
  logger.info(`Vector Service running on port ${config.PORT}`);
});
