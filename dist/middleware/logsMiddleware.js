"use strict";
// this will create of every request made to the server
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.logsMiddleware = void 0;
const db_connection_1 = require("../db/db_connection");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const logsMiddleware = (req, _res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const token = (_a = req.header("Authorization")) === null || _a === void 0 ? void 0 : _a.replace("Bearer ", "");
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
        const newLog = yield db_connection_1.Logs.create(userLogs);
        console.log("New log created:", newLog);
        next();
    }
    catch (error) {
        console.error("Error creating log:", error);
        next();
    }
});
exports.logsMiddleware = logsMiddleware;
