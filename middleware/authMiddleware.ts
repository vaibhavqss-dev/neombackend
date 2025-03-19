import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { User } from "../db/db_connect";
import dotenv from "dotenv";
dotenv.config();

export const authMiddleWare = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const token = req.header("Authorization")?.replace("Bearer ", "");
    if (!token) {
      throw new Error("Please authenticate");
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET || "");
    // const user = await User.findOne({ where: { id: (decoded as any).userId } });

    // if (!user) {
    //   throw new Error("Please authenticate");
    // }
    req.user = decoded;
    next();
  } catch (error) {
    res.status(401).send({
      error: error instanceof Error ? error.message : "Authentication failed",
    });
  }
};
