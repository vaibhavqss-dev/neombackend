import { Request, Response } from "express";
import { Auth, User } from "../db/db_connection";
import jwt from "jsonwebtoken";

export const loginUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const { username, password } = req.body;
    console.log(username, password);
    const user = await Auth.findOne({ where: { username } });

    if (!user) {
      res.status(401).json({ error: "Invalid credentials" });
      return;
    }
    const isPasswordValid = await user.comparePassword(password);
    if (!isPasswordValid) {
      res.status(401).json({ error: "Invalid credentials" });
      return;
    }

    const token = jwt.sign(
      { userId: user.id, username: user.username },
      process.env.JWT_SECRET || "default_secret_key",
      { expiresIn: "30h" }
    );

    res.status(200).json({
      success: true,
      message: "Login successful",
      token,
    });
  } catch (error) {
    console.error("Error during login:", error);
    res.status(500).json({ success: false, message: "Login failed" });
  }
};

export const userSignup = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { username, password } = req.body;
    const { name, email, mobile_number } = req.body;

    if (!username || !password) {
      res.status(400).json({ error: "Username and password are required" });
      return;
    }

    const existingUser = await Auth.findOne({ where: { username } });
    if (existingUser) {
      res.status(400).json({ error: "User already exists" });
      return;
    }
    const user = await Auth.create({ username, password });
    const Users = await User.create({
      id: user.id,
      name,
      email,
      mobile_number,
      interests: [],
    });

    res.status(201).json({
      success: true,
      message: "User created successfully",
      user: {
        id: user.id,
        username: user.username,
        name: Users.name,
        email: Users.email,
        mobilenumber: Users.mobile_number,
      },
    });
  } catch (error) {
    console.error("Error creating user:", error);
    res.status(500).json({
      success: false,
      message: error instanceof Error ? error.message : "Failed to create user",
    });
  }
};
