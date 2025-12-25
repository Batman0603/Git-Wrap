import dotenv from "dotenv";
dotenv.config();

import express from "express";
import rateLimit from "express-rate-limit";
import repoRoutes from "./services/repo.routes.js";

const app = express();

// Rate Limiter: 100 requests per 15 minutes
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  standardHeaders: true,
  legacyHeaders: false,
});

app.use(limiter);

app.get("/health", (_, res) => {
  res.json({ status: "repo-ingestion-service healthy" });
});

app.use("/api/repos", repoRoutes);

app.listen(5001, () =>
  console.log("Repo Ingestion Service running on port 5001")
);
