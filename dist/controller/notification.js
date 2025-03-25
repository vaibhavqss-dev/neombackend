"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendNotificationToClient = exports.broadcastNotification = exports.notification = void 0;
const db_config_1 = require("../db/db_config");
const clients = new Map();
const notification = async (req, res) => {
    try {
        res.setHeader("Content-Type", "text/event-stream");
        res.setHeader("Cache-Control", "no-cache");
        res.setHeader("Connection", "keep-alive");
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
        const notifications = await db_config_1.Notifications.findOne({
            where: {
                user_id: user_id,
            },
        });
        let message = "No new notifications";
        if (notifications) {
            message = JSON.parse(notifications.description);
            try {
            }
            catch (error) {
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
    }
    catch (error) {
        console.error("Error establishing SSE connection:", error);
        res.status(500).end();
    }
};
exports.notification = notification;
const sendNotification = (res, data) => {
    try {
        res.write(`data: ${JSON.stringify(data)}\n\n`);
    }
    catch (error) {
        console.error("Error sending notification:", error);
    }
};
const broadcastNotification = (data) => {
    clients.forEach((client, user_id) => {
        try {
            sendNotification(client, data);
        }
        catch (error) {
            console.error(`Error broadcasting to client ${user_id}:`, error);
            clients.delete(user_id);
        }
    });
};
exports.broadcastNotification = broadcastNotification;
const sendNotificationToClient = (user_id, data) => {
    const client = clients.get(user_id);
    if (client) {
        try {
            sendNotification(client, data);
            return true;
        }
        catch (error) {
            console.error(`Error sending to client ${user_id}:`, error);
            clients.delete(user_id);
        }
    }
    return false;
};
exports.sendNotificationToClient = sendNotificationToClient;
const PushNotification_to_db = async (notification) => {
    const notificationRecord = {
        user_id: 1,
        description: JSON.stringify(notification),
        is_read: false,
        message_id: 1,
    };
    await db_config_1.Notifications.create(notificationRecord);
};
