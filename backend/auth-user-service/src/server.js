import dotenv from "dotenv";
import { fileURLToPath } from "url";

// Load .env file relative to this file (works regardless of working directory)
dotenv.config({ path: fileURLToPath(new URL("./.env", import.meta.url)) });

import express from "express";
import cookieParser from "cookie-parser";
import authRoutes from "./routes/auth.routes.js";
import { errorHandler } from "./middlewares/error.middleware.js";

const app = express();

app.use(express.json());
app.use(cookieParser());

app.use("/api/auth", authRoutes);
app.use(errorHandler);

app.listen(4000, () =>
  console.log("Auth User Service running on port 4000")
);
