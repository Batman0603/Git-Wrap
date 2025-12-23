import { db } from "../config/db.js";

export const findUserByEmailOrUsername = async (identifier) => {
  const [rows] = await db.query(
    "SELECT * FROM users WHERE email = ? OR username = ?",
    [identifier, identifier]
  );
  return rows[0];
};

export const createUser = async (user) => {
  const { username, full_name, email, password_hash } = user;
  await db.query(
    "INSERT INTO users (username, full_name, email, password_hash) VALUES (?, ?, ?, ?)",
    [username, full_name, email, password_hash]
  );
};
