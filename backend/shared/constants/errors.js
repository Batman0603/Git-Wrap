import mongoose from "mongoose";
import { logger } from "../utils/logger.js";

export const connectMongo = async (uri) => {
  if (!uri) throw new Error("MongoDB URI missing");

  mongoose.connection.on("connected", () => {
    logger.info("MongoDB connected");
  });

  mongoose.connection.on("error", (err) => {
    logger.error("MongoDB error", err);
  });

  mongoose.connection.on("disconnected", () => {
    logger.warn("MongoDB disconnected");
  });

  const connectWithRetry = async (retries = 5) => {
    try {
      await mongoose.connect(uri, {
        autoIndex: false,
        serverSelectionTimeoutMS: 5000,
      });
    } catch (err) {
      if (retries === 0) throw err;
      logger.warn(`Retrying MongoDB... (${retries})`);
      await new Promise(r => setTimeout(r, 3000));
      return connectWithRetry(retries - 1);
    }
  };

  await connectWithRetry();
};
