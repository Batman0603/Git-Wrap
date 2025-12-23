import mysql from "mysql2/promise";
import dotenv from "dotenv";
import fs from "fs";
import { fileURLToPath } from "url";

// Ensure .env is loaded relative to this file so DB config is available
const envPath = fileURLToPath(new URL("../.env", import.meta.url));
dotenv.config({ path: envPath });

// Debugging: ensure .env file is found and readable (safe for local debugging)
try {
  console.log("[env debug] .env path:", envPath);
  console.log("[env debug] exists:", fs.existsSync(envPath));
  console.log("[env debug] preview:", fs.readFileSync(envPath, "utf8").split(/\r?\n/).slice(0, 6));
} catch (e) {
  console.error("[env debug] error reading .env:", e.message);
}
// Ensure required environment variables are present to avoid confusing DB errors
const required = ["DB_HOST", "DB_USER", "DB_PASS", "DB_NAME"];
const missing = required.filter((k) => !process.env[k]);
if (missing.length) {
  throw new Error(
    `Missing required environment variables for DB connection: ${missing.join(", ")}`
  );
}

export const db = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  waitForConnections: true,
  connectionLimit: 10
});
