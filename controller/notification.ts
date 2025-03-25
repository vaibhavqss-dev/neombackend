import { Request, Response } from "express";
import { Notifications } from "../db/db_config";
const clients: Map<string, Response> = new Map();

// SSEs
export const notification = async (req: Request, res: Response) => {
  try {
    res.setHeader("Content-Type", "text/event-stream");
    res.setHeader("Cache-Control", "no-cache");
    res.setHeader("Connection", "keep-alive");
    // res.connection.setTimeout(0);

    const { userId: user_id } = req.user;
    const clientId = user_id?.toString() || Date.now().toString();
    clients.set(clientId, res);

    console.log(`Client ${clientId} connected`);

    req.on("close", () => {
      clients.delete(clientId);
      console.log(`Client ${clientId} disconnected`);
    });
    res.on("error", (error) => {
      console.error(`Error in SSE connection for client ${clientId}:`, error);
      clients.delete(clientId);
    });

    const notifications = await Notifications.findOne({
      where: {
        user_id: user_id,
      },
    });

    let message = "No new notifications";

    if (notifications) {
      message = JSON.parse(notifications.description);
      try {
      } catch (error) {
        console.log("Could not parse notification as JSON, using raw value");
        message = notifications.description;
      }
    }

    sendNotification(res, {
      type: "notification",
      message,
      clientId,
      is_read: notifications?.is_read,
      message_id: notifications?.message_id,
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

const PushNotification_to_db = async (notification: any) => {
  const notificationRecord = {
    user_id: 1,
    description: JSON.stringify(notification),
    is_read: false,
    message_id: 1,
  };

  await Notifications.create(notificationRecord);
};

let i = 0;
 setInterval(() => {
   const notification = {
     type: "notification",
     message: `Event ${i} could not be hold as mentioned, would you like to reschedule?`,
     msgid: 1,
     event_id: 2,
 event_name: "Event 2",
   };

   // sendNotificationToClient("1", {
   //   type: "notification",
   //   message: `Event 2 could not be hold as mentioned, would you like to reschedule?`,
   //   msgid: 1,
   //   event_id: 2,
   //   event_name: "Event 2",
   // });
   
   //PushNotification_to_db(notification);
   console.log("Notification sent to client 1");
   i++;
 }, 10000);
