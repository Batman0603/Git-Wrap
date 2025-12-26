import express from "express";
import dotenv from "dotenv";
import { recommendRepos } from "./controllers/recommendation.controller.js";
import { config } from "./config/index.js";

dotenv.config();

const app = express();
app.use(express.json());

app.get("/api/recommend", recommendRepos);

app.listen(config.port, () => {
  console.log(`Recommendation Service running on port ${config.port}`);
});
