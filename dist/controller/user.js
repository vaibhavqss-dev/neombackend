"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getReservedEvents = exports.getTrendingActivity = exports.getRecommendation = exports.getReviews = exports.addReviews = exports.fetchVisitedEvents = exports.reserveEvent = exports.addInterested = exports.likeEvent = exports.changeSettings = exports.deleteUserProfile = exports.getUserProfile = exports.updateProfile = exports.createUserProfile = void 0;
const db_connection_1 = require("../db/db_connection");
const sequelize_1 = require("sequelize");
const createUserProfile = async (req, res) => {
    try {
        const { username, password } = req.body;
        const existingUser = await db_connection_1.Auth.findOne({ where: { username } });
        if (existingUser) {
            res.status(400).json({ error: "User already exists" });
            return;
        }
        const user = await db_connection_1.Auth.create({ username, password });
        res.status(201).json({ message: "User created successfully", user });
    }
    catch (error) {
        console.error("Error creating user:", error);
        res.status(500).json({ success: false, message: "Failed to create user" });
    }
};
exports.createUserProfile = createUserProfile;
const updateProfile = async (req, res) => {
    try {
        const { userId: user_id } = req.user;
        const { name, email, mobilenumber, interests } = req.body;
        const user = await db_connection_1.User.findByPk(user_id);
        if (!user) {
            res.status(404).json({ success: false, message: "User not found" });
            return;
        }
        const updateData = {};
        updateData.id = user_id;
        if (name !== undefined)
            updateData.name = name;
        if (email !== undefined)
            updateData.email = email;
        if (mobilenumber !== undefined)
            updateData.mobilenumber = mobilenumber;
        if (interests !== undefined)
            updateData.interests = interests;
        await user.update(updateData);
        res.status(200).json({
            success: true,
            message: "User profile updated successfully",
            updated_fields: updateData,
        });
    }
    catch (error) {
        console.error("Error updating user:", error);
        res.status(500).json({ success: false, message: "Failed to update user" });
    }
};
exports.updateProfile = updateProfile;
const getUserProfile = async (req, res) => {
    try {
        const { userId: user_id } = req.user;
        const user = await db_connection_1.User.findByPk(user_id);
        if (!user) {
            res.status(404).json({ success: false, message: "User not found" });
            return;
        }
        res.status(200).json({
            success: true,
            message: "User retrieved successfully",
            data: user,
        });
    }
    catch (error) {
        console.error("Error fetching user:", error);
        res
            .status(500)
            .json({ success: false, message: "Failed to retrieve user" });
    }
};
exports.getUserProfile = getUserProfile;
const deleteUserProfile = async (req, res) => {
    try {
        const { userId: user_id } = req.user;
        const user = await db_connection_1.User.findByPk(user_id);
        if (!user) {
            res.status(404).json({ success: false, message: "User not found" });
            return;
        }
        await user.destroy();
        res.status(200).json({
            success: true,
            message: "User deleted successfully",
        });
    }
    catch (error) {
        console.error("Error deleting user:", error);
        res.status(500).json({ success: false, message: "Failed to delete user" });
    }
};
exports.deleteUserProfile = deleteUserProfile;
const changeSettings = async (req, res) => {
    try {
        const { userId: user_id } = req.user;
        const { personalandAccount, operator, managedata, password_security, notification_email, notification_sms, notification_personalized, language, } = req.body;
        const user = await db_connection_1.Auth.findByPk(user_id);
        if (!user) {
            res.status(404).json({ success: false, message: "Users123 not found" });
            return;
        }
        const updateSetting = {};
        if (personalandAccount !== undefined)
            updateSetting.personalandAccount = personalandAccount;
        if (operator !== undefined)
            updateSetting.operator = operator;
        if (managedata !== undefined)
            updateSetting.managedata = managedata;
        if (password_security !== undefined)
            updateSetting.password_security = password_security;
        if (notification_email !== undefined)
            updateSetting.notification_email = notification_email;
        if (notification_sms !== undefined)
            updateSetting.notification_sms = notification_sms;
        if (notification_personalized !== undefined)
            updateSetting.notification_personalized = notification_personalized;
        if (language !== undefined)
            updateSetting.language = language;
        await user.update({ updateSetting });
        res.status(200).json({
            success: true,
            message: "Settings updated successfully",
            updated_fields: updateSetting,
        });
    }
    catch (error) {
        console.error("Error updating settings:", error);
        res
            .status(500)
            .json({ success: false, message: "Failed to update settings" });
    }
};
exports.changeSettings = changeSettings;
const likeEvent = async (req, res) => {
    try {
        console.log(req.user);
        const { userId: user_id } = req.user;
        const { event_id } = req.body;
        const user = await db_connection_1.User.findOne({ where: { id: user_id } });
        if (!user) {
            res.status(404).json({ success: false, message: "User not found" });
            return;
        }
        let isOk = await user.addLikedEvent(event_id);
        if (!isOk) {
            res.status(400).json({ success: false, message: "Event already liked" });
            return;
        }
        res.status(200).json({
            success: true,
            message: "Event Added to liked events successfully",
        });
    }
    catch (error) {
        console.error("Error liking event:", error);
        res.status(500).json({ success: false, message: "Failed to like event" });
    }
};
exports.likeEvent = likeEvent;
const addInterested = async (req, res) => {
    try {
        const { userId: user_id } = req.user;
        const { interest } = req.body;
        const user = await db_connection_1.User.findByPk(user_id);
        if (!user) {
            res.status(404).json({ success: false, message: "User not found" });
            return;
        }
        let isAdded = await user.addInterested(interest);
        if (!isAdded) {
            res
                .status(400)
                .json({ success: false, message: "Interest already exists" });
            return;
        }
        res.status(200).json({
            success: true,
            message: "Event Added to interested events successfully",
        });
    }
    catch (error) {
        console.error("Error adding interested event:", error);
        res
            .status(500)
            .json({ success: false, message: "Failed to add interested event" });
    }
};
exports.addInterested = addInterested;
const reserveEvent = async (req, res) => {
    try {
        const { event_id, date_from, date_to, event_name, no_of_guest, event_category, } = req.body;
        const { userId: user_id } = req.user;
        const user = await db_connection_1.User.findByPk(user_id);
        if (!user) {
            res.status(404).json({ success: false, message: "User not found" });
            return;
        }
        let isReserved = await db_connection_1.ReservedEvent.create({
            user_id,
            event_id,
            date_from,
            date_to,
            event_name,
            no_of_guest,
            event_category,
        });
        if (!isReserved) {
            res
                .status(400)
                .json({ success: false, message: "Event already reserved" });
            return;
        }
        res.status(200).json({
            success: true,
            message: "Event Added to reserved events successfully",
        });
    }
    catch (error) {
        console.error("Error reserving event:", error);
        res
            .status(500)
            .json({ success: false, message: "Failed to reserve event" });
    }
};
exports.reserveEvent = reserveEvent;
const fetchVisitedEvents = async (req, res) => {
    try {
        const { userId: user_id } = req.user;
        const { event_id, date, time, location, event_type } = req.body;
        const user = await db_connection_1.User.findByPk(user_id);
        if (!user) {
            res.status(404).json({ success: false, message: "User not found" });
            return;
        }
        let isVisited = await db_connection_1.ReservedEvent.findAll({
            where: {
                user_id,
                date_to: {
                    [sequelize_1.Op.lt]: new Date(),
                },
            },
            limit: 20,
        });
        res.status(200).json({
            success: true,
            number: isVisited.length,
            message: "Visited events retrieved successfully",
            events: isVisited,
        });
    }
    catch (error) {
        console.error("Error visiting event:", error);
        res.status(500).json({ success: false, message: "Failed to visit event" });
    }
};
exports.fetchVisitedEvents = fetchVisitedEvents;
const addReviews = async (req, res) => {
    try {
        const { userId: user_id } = req.user;
        const { quality_of_event, service_of_event, facilites_of_event, staffPoliteness, operator_of_event, event_name, event_id, location, event_category, comment, } = req.body;
        const user = await db_connection_1.User.findByPk(user_id);
        if (!user) {
            res.status(404).json({ success: false, message: "User not found" });
            return;
        }
        const rating = (quality_of_event +
            service_of_event +
            facilites_of_event +
            staffPoliteness +
            operator_of_event) /
            5;
        try {
            let isReviewed = await db_connection_1.Reviews.create({
                user_id,
                event_id,
                username: user.name,
                comment,
                date: new Date(),
                time: new Date().toLocaleTimeString(),
                location,
                event_category,
                event_name,
                rating,
            });
        }
        catch (error) {
            if (error instanceof Error &&
                error.name === "SequelizeUniqueConstraintError") {
                res
                    .status(400)
                    .json({ success: false, message: "Event already reviewed" });
                return;
            }
            throw error;
        }
        res.status(200).json({
            success: true,
            message: "Event Added to reviewed events successfully",
        });
    }
    catch (error) {
        console.error("Error reviewing event:", error);
        res.status(500).json({ success: false, message: "Failed to review event" });
    }
};
exports.addReviews = addReviews;
const getReviews = async (req, res) => {
    try {
        const { userId: user_id } = req.user;
        const { event_id } = req.query;
        const query = {};
        if (event_id) {
            query.event_id = event_id;
        }
        if (user_id) {
            query.user_id = user_id;
        }
        const reviews = await db_connection_1.Reviews.findAll({
            where: query,
            limit: 20,
        });
        if (!reviews) {
            res.status(404).json({ success: false, message: "No reviews found" });
            return;
        }
        res.status(200).json({
            success: true,
            message: "Reviews retrieved successfully",
            reviews: reviews,
        });
    }
    catch (error) {
        console.error("Error fetching reviews:", error);
        res
            .status(500)
            .json({ success: false, message: "Failed to fetch reviews" });
    }
};
exports.getReviews = getReviews;
const getRecommendation = async (req, res) => {
    try {
        const { userId } = req.user;
        const user = await db_connection_1.User.findByPk(userId);
        if (!user) {
            res.status(404).json({ success: false, message: "User not found" });
            return;
        }
        const recommendation = await db_connection_1.Event.findAll({
            where: {
                category: user.interests.length == 0 ? "joy" : user.interests[0],
            },
            limit: 15,
        });
        if (!recommendation) {
            res.status(404).json({
                success: false,
                message: "Please add your interest in setting to let us find some suggestion for you",
            });
            return;
        }
        res.status(200).json({
            success: true,
            message: "Recommendation retrieved successfully",
            event: recommendation,
        });
    }
    catch (error) {
        console.error("Error fetching recommendation:", error);
        res
            .status(500)
            .json({ success: false, message: "Failed to retrieve recommendation" });
    }
};
exports.getRecommendation = getRecommendation;
const getTrendingActivity = async (_req, res) => {
    try {
        const trending = await db_connection_1.Logs.findAll({
            limit: 200,
        });
        const events = db_connection_1.Event.findAll({
            where: {
                id: trending.map((event) => event.event_id),
            },
            limit: 20,
        });
        const trendingEventsMap = res.status(200).json({
            success: true,
            message: "Trending events retrieved successfully",
            data: events,
        });
    }
    catch (error) {
        console.error("Error fetching trending events:", error);
        res
            .status(500)
            .json({ success: false, message: "Failed to retrieve trending events" });
    }
};
exports.getTrendingActivity = getTrendingActivity;
const getReservedEvents = async (req, res) => {
    try {
        const { userId } = req.user;
        const reservedEvents = await db_connection_1.ReservedEvent.findAll({
            where: { user_id: userId },
            limit: 20,
        });
        if (!reservedEvents) {
            res.status(404).json({ success: false, message: "No reserved events" });
            return;
        }
        res.status(200).json({
            success: true,
            message: "Reserved events retrieved successfully",
            data: reservedEvents,
        });
    }
    catch (error) {
        console.error("Error fetching reserved events:", error);
        res
            .status(500)
            .json({ success: false, message: "Failed to retrieve reserved events" });
    }
};
exports.getReservedEvents = getReservedEvents;
