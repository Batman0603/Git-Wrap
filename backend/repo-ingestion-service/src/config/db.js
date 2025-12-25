import mysql from "mysql2/promise";
import dotenv from "dotenv";

// Load env vars immediately because this file is imported before server.js runs dotenv.config()
dotenv.config();

export const db = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  waitForConnections: true,
  connectionLimit: 10
});
