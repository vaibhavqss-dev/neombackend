"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userSignup = exports.loginUser = void 0;
const db_connection_1 = require("../db/db_connection");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const loginUser = async (req, res) => {
    try {
        const { username, password } = req.body;
        console.log(username, password);
        const user = await db_connection_1.Auth.findOne({ where: { username } });
        if (!user) {
            res.status(401).json({ error: "Invalid credentials" });
            return;
        }
        const isPasswordValid = await user.comparePassword(password);
        if (!isPasswordValid) {
            res.status(401).json({ error: "Invalid credentials" });
            return;
        }
        const token = jsonwebtoken_1.default.sign({ userId: user.id, username: user.username }, process.env.JWT_SECRET || "default_secret_key", { expiresIn: "30h" });
        res.status(200).json({
            success: true,
            message: "Login successful",
            token,
            username: user.username,
            user_id: user.id,
        });
    }
    catch (error) {
        console.error("Error during login:", error);
        res.status(500).json({ success: false, message: "Login failed" });
    }
};
exports.loginUser = loginUser;
const userSignup = async (req, res) => {
    try {
        const { username, password } = req.body;
        const { name, email, mobile_number } = req.body;
        if (!username || !password) {
            res.status(400).json({ error: "Username and password are required" });
            return;
        }
        const existingUser = await db_connection_1.Auth.findOne({ where: { username } });
        if (existingUser) {
            res.status(400).json({ message: "User already exists" });
            return;
        }
        const user = await db_connection_1.Auth.create({ username, password });
        const Users = await db_connection_1.User.create({
            id: user.id,
            name,
            email,
            mobile_number,
            interests: [],
        });
        res.status(201).json({
            success: true,
            message: "User created successfully",
            user: {
                id: user.id,
                username: user.username,
                name: Users.name,
                email: Users.email,
                mobilenumber: Users.mobile_number,
            },
        });
    }
    catch (error) {
        console.error("Error creating user:", error);
        res.status(500).json({
            success: false,
            message: error instanceof Error ? error.message : "Failed to create user",
        });
    }
};
exports.userSignup = userSignup;
