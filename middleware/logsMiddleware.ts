// this will create of every request made to the server

import { Request, Response, NextFunction } from "express";
import { Logs } from "../db/db_connection";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

export const logsMiddleware = async (
  req: Request,
  _res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const token = req.header("Authorization")?.replace("Bearer ", "");
    if (!token) {
      throw new Error("Please authenticate");
    }
    const user: any = jwt.verify(token, process.env.JWT_SECRET || "");
    const userLogs: any = {};
    userLogs.user_id = user.id;
    userLogs.method = req.method;
    userLogs.path = req.path;
    userLogs.ip = req.ip;
    userLogs.hostname = req.hostname;
    userLogs.protocol = req.protocol;
    userLogs.originalUrl = req.originalUrl;

    const newLog = await Logs.create(userLogs);
    console.log("New log created:", newLog);
    next();
  } catch (error) {
    console.error("Error creating log:", error);
    next();
  }
};
