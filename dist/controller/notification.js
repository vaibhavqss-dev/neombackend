"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendNotificationToClient = exports.broadcastNotification = exports.notification = void 0;
const clients = new Map();
// SSEs
const notification = (req, res) => {
    var _a;
    res.setHeader("Content-Type", "text/event-stream");
    res.setHeader("Cache-Control", "no-cache");
    res.setHeader("Connection", "keep-alive");
    const clientId = ((_a = req.query.clientId) === null || _a === void 0 ? void 0 : _a.toString()) || Date.now().toString();
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
exports.notification = notification;
const sendNotification = (res, data) => {
    res.write(`data: ${JSON.stringify(data)}\n\n`);
};
const broadcastNotification = (data) => {
    clients.forEach((client) => {
        sendNotification(client, data);
    });
};
exports.broadcastNotification = broadcastNotification;
const sendNotificationToClient = (clientId, data) => {
    const client = clients.get(clientId);
    if (client) {
        sendNotification(client, data);
        return true;
    }
    return false;
};
exports.sendNotificationToClient = sendNotificationToClient;
