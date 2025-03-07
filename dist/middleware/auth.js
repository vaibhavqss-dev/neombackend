"use strict";
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
exports.authMiddleWare = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const db_connection_1 = require("../db/db_connection");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const authMiddleWare = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const token = (_a = req.header("Authorization")) === null || _a === void 0 ? void 0 : _a.replace("Bearer ", "");
        if (!token) {
            throw new Error("Please authenticate");
        }
        const decoded = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET || "");
        const user = yield db_connection_1.User.findOne({ where: { id: decoded.id } });
        if (!user) {
            throw new Error("Please authenticate");
        }
        req.user = user;
        next();
    }
    catch (error) {
        res.status(401).send({
            error: error instanceof Error ? error.message : "Authentication failed",
        });
    }
});
exports.authMiddleWare = authMiddleWare;
