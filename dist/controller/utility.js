"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCurrentTime = exports.StatusRoute = void 0;
const StatusRoute = (_req, res) => {
    res.status(200).json({
        status: "success",
        message: "API is running properly",
        timestamp: new Date().toISOString(),
        environment: process.env.NODE_ENV || "production",
        servername: "Neom Server",
    });
};
exports.StatusRoute = StatusRoute;
const getCurrentTime = () => {
    return new Date().toTimeString().split(' ')[0];
};
exports.getCurrentTime = getCurrentTime;
