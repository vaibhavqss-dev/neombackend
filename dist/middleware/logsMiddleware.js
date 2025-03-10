"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.logsMiddleware = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const fs_1 = __importDefault(require("fs"));
const logsMiddleware = async (req, _res, next) => {
    try {
        const token = req.header("Authorization")?.replace("Bearer ", "");
        if (!token) {
            throw new Error("Please authenticate");
        }
        const user = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET || "");
        const userLogs = {};
        userLogs.user_id = user.id;
        userLogs.method = req.method;
        userLogs.path = req.path;
        userLogs.ip = req.ip;
        userLogs.hostname = req.hostname;
        userLogs.protocol = req.protocol;
        userLogs.originalUrl = req.originalUrl;
        fs_1.default.appendFile("logs.txt", JSON.stringify(userLogs) + "\n", (err) => {
            if (err) {
                console.error("Error writing logs to file:", err);
            }
        });
        next();
    }
    catch (error) {
        console.error("Error creating log:", error);
        next();
    }
};
exports.logsMiddleware = logsMiddleware;
