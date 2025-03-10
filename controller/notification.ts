import { Request, Response } from "express";
const clients: Map<string, Response> = new Map();

// SSEs
export const notification = (req: Request, res: Response) => {
  try {
    res.setHeader("Content-Type", "text/event-stream");
    res.setHeader("Cache-Control", "no-cache");
    res.setHeader("Connection", "keep-alive");
    // res.connection.setTimeout(0);

    const { userId: user_id } = req.user;
    const clientId = req.query.user_id?.toString() || Date.now().toString();
    clients.set(clientId, res);
    req.on("close", () => {
      clients.delete(clientId);
      console.log(`Client ${clientId} disconnected`);
    });
    res.on("error", (error) => {
      console.error(`Error in SSE connection for client ${clientId}:`, error);
      clients.delete(clientId);
    });

    sendNotification(res, {
      type: "connection",
      message: "Connection established",
      clientId,
    });
  } catch (error) {
    console.error("Error establishing SSE connection:", error);
    res.status(500).end();
  }
};

interface NotificationData {
  type: string;
  message: string;
  [key: string]: any;
}

const sendNotification = (res: Response, data: NotificationData): void => {
  try {
    res.write(`data: ${JSON.stringify(data)}\n\n`);
  } catch (error) {
    console.error("Error sending notification:", error);
  }
};

export const broadcastNotification = (data: NotificationData): void => {
  clients.forEach((client, user_id) => {
    try {
      sendNotification(client, data);
    } catch (error) {
      console.error(`Error broadcasting to client ${user_id}:`, error);
      clients.delete(user_id);
    }
  });
};

export const sendNotificationToClient = (
  user_id: string,
  data: NotificationData
): boolean => {
  const client = clients.get(user_id);
  if (client) {
    try {
      sendNotification(client, data);
      return true;
    } catch (error) {
      console.error(`Error sending to client ${user_id}:`, error);
      clients.delete(user_id);
    }
  }
  return false;
};
