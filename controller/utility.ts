import { Request, Response } from "express";

/**
 * @param req
 * @param res
 */

export const StatusRoute = (_req: Request, res: Response) => {
  res.status(200).json({
    status: "success",
    message: "API is running properly",
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || "production",
    servername: "Neom Server",
  });
};

export const getCurrentTime = (): string => {
  return new Date().toTimeString().split(' ')[0];
};
