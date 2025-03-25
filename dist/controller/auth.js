"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userSignup = exports.loginUser = void 0;
const db_connect_1 = require("../db/db_connect");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const loginUser = async (req, res) => {
    try {
        const { username, password } = req.body;
        console.log(username, password);
        const user = await db_connect_1.Auth.findOne({ where: { username } });
        if (!user) {
            res.status(401).json({ error: "Invalid credentials" });
            return;
        }
        const isPasswordValid = await user.comparePassword(password);
        if (!isPasswordValid) {
            res.status(401).json({ error: "Invalid credentials" });
            return;
        }
        const token = jsonwebtoken_1.default.sign({ userId: user.user_id, username: user.username, name: user.fullname }, process.env.JWT_SECRET || "default_secret_key", { expiresIn: "30h" });
        res.status(200).json({
            success: true,
            message: "Login successful",
            token,
            username: user.username,
            user_id: user.user_id,
            fullname: user.fullname,
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
        const existingUser = await db_connect_1.Auth.findOne({ where: { username } });
        if (existingUser) {
            res.status(400).json({ message: "User already exists" });
            return;
        }
        const result = await db_connect_1.sequelize.transaction(async (t) => {
            const Users = await db_connect_1.User.create({
                name,
                email,
                mobile_number,
                interests: [],
                likes: [],
                profile_img: "https://oplsgvveavucoyuifbte.supabase.co/storage/v1/object/public/neom-images/assests/profilePic.png",
                curr_latitute: "0",
                curr_longitude: "0",
            }, { transaction: t });
            const user = await db_connect_1.Auth.create({
                fullname: name,
                username,
                password,
                user_id: Users.user_id,
            }, { transaction: t });
            return { Users, user };
        });
        const { Users, user } = result;
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
