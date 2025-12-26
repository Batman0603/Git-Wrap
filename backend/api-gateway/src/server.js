import express from "express";
import axios from "axios";
import dotenv from "dotenv";
import { verifyToken } from "./middlewares/auth.middleware.js";

dotenv.config();

const app = express();
app.use(express.json());

const PORT = process.env.PORT || 3000;

// --- Public Routes (No Auth) ---

/**
 * Auth Service Proxy
 * Forwards login and signup requests to the Auth Service.
 */
app.post("/auth/*", async (req, res) => {
  try {
    const response = await axios.post(`${process.env.AUTH_SERVICE_URL}${req.originalUrl}`, req.body);
    res.status(response.status).json(response.data);
  } catch (error) {
    res.status(error.response?.status || 500).json(error.response?.data || { error: "Auth service failed" });
  }
});

// --- Protected Routes (Require Token) ---

/**
 * Recommendation Service Proxy
 * Fetches recommendations based on user query. Requires valid JWT.
 */
app.get("/api/recommend", verifyToken, async (req, res) => {
  try {
    const response = await axios.get(`${process.env.RECOMMENDATION_SERVICE_URL}/api/recommend`, {
      params: req.query
    });
    res.json(response.data);
  } catch (error) {
    res.status(error.response?.status || 500).json(error.response?.data || { error: "Recommendation service failed" });
  }
});

/**
 * Vector Service Proxy
 * Ingests repository data into the vector store. Requires valid JWT.
 */
app.post("/vectors/ingest", verifyToken, async (req, res) => {
  try {
    const response = await axios.post(`${process.env.VECTOR_SERVICE_URL}/vectors/ingest`, req.body);
    res.json(response.data);
  } catch (error) {
    res.status(error.response?.status || 500).json(error.response?.data || { error: "Vector service failed" });
  }
});

/**
 * Repo Ingestion Proxy
 * Searches for repositories via the Ingestion Service. Requires valid JWT.
 */
app.get("/repos/search", verifyToken, async (req, res) => {
  try {
    const response = await axios.get(`${process.env.INGESTION_SERVICE_URL}/api/repos/search`, {
      params: req.query
    });
    res.json(response.data);
  } catch (error) {
    res.status(error.response?.status || 500).json(error.response?.data || { error: "Ingestion service failed" });
  }
});

app.listen(PORT, () => {
  console.log(`API Gateway running on port ${PORT}`);
});