"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authMiddleWare = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const authMiddleWare = async (req, res, next) => {
    try {
        const token = req.header("Authorization")?.replace("Bearer ", "");
        if (!token) {
            throw new Error("Please authenticate");
        }
        const decoded = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET || "");
        req.user = decoded;
        next();
    }
    catch (error) {
        res.status(401).send({
            error: error instanceof Error ? error.message : "Authentication failed",
        });
    }
};
exports.authMiddleWare = authMiddleWare;
