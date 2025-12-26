import {
  findUserByEmailOrUsername,
  createUser
} from "../models/user.model.js";
import {
  hashPassword,
  verifyPassword,
  generateToken
} from "../services/auth.service.js";

export const signup = async (req, res, next) => {
  try {
    const { username, fullName, email, password, confirmPassword } = req.body;

    if (password !== confirmPassword)
      return res.status(400).json({ message: "Passwords do not match" });

    const existing = await findUserByEmailOrUsername(email);
    if (existing)
      return res.status(409).json({ message: "User already exists" });

    const password_hash = await hashPassword(password);

    await createUser({
      username,
      full_name: fullName,
      email,
      password_hash
    });

    const newUser = await findUserByEmailOrUsername(email);
    const token = generateToken(newUser);

    res.status(201).json({ message: "User created successfully", token });
  } catch (err) {
    next(err);
  }
};

export const login = async (req, res, next) => {
  try {
    const { identifier, password } = req.body;

    const user = await findUserByEmailOrUsername(identifier);
    if (!user)
      return res.status(401).json({ message: "Invalid credentials" });

    const valid = await verifyPassword(password, user.password_hash);
    if (!valid)
      return res.status(401).json({ message: "Invalid credentials" });

    const token = generateToken(user);

    res.cookie("token", token, {
      httpOnly: true,
      secure: true,
      sameSite: "strict",
      maxAge: 30 * 60 * 1000
    });

    res.json({ message: "Login successful", token });
  } catch (err) {
    next(err);
  }
};
