import { Request, Response } from "express";
const clients: Map<string, Response> = new Map();

// SSEs
export const notification = (req: Request, res: Response) => {
  res.setHeader("Content-Type", "text/event-stream");
  res.setHeader("Cache-Control", "no-cache");
  res.setHeader("Connection", "keep-alive");
  const clientId = req.query.clientId?.toString() || Date.now().toString();
  clients.set(clientId, res);
  req.on("close", () => {
    clients.delete(clientId);
    console.log(`Client ${clientId} disconnected`);
  });

  sendNotification(res, {
    type: "connection",
    message: "Connection established",
    clientId,
  });
};

const sendNotification = (res: Response, data: any): void => {
  res.write(`data: ${JSON.stringify(data)}\n\n`);
};

export const broadcastNotification = (data: any): void => {
  clients.forEach((client) => {
    sendNotification(client, data);
  });
};

export const sendNotificationToClient = (
  clientId: string,
  data: any
): boolean => {
  const client = clients.get(clientId);
  if (client) {
    sendNotification(client, data);
    return true;
  }
  return false;
};
