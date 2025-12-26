import dotenv from "dotenv";
dotenv.config();

export const config = {
  PORT: process.env.PORT || 5005,
  EMBEDDING_API: process.env.EMBEDDING_API || "mock"
};
