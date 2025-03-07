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
Object.defineProperty(exports, "__esModule", { value: true });
exports.getTrendingActivity = exports.getRecommendation = exports.addReviews = exports.visitedEvents = exports.reserveEvent = exports.addInterested = exports.likeEvent = exports.changeSettings = exports.deleteUserProfile = exports.getUserProfile = exports.updateProfile = exports.createUserProfile = void 0;
const db_connection_1 = require("../db/db_connection");
// already used with signup controller
const createUserProfile = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { username, password } = req.body;
        const existingUser = yield db_connection_1.Auth.findOne({ where: { username } });
        if (existingUser) {
            res.status(400).json({ error: "User already exists" });
            return;
        }
        const user = yield db_connection_1.Auth.create({ username, password });
        res.status(201).json({ message: "User created successfully", user });
    }
    catch (error) {
        console.error("Error creating user:", error);
        res.status(500).json({ success: false, message: "Failed to create user" });
    }
});
exports.createUserProfile = createUserProfile;
const updateProfile = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, email, mobilenumber, interest, userId } = req.body;
        // Check if user exists
        const user = yield db_connection_1.Auth.findByPk(userId);
        if (!user) {
            res.status(404).json({ success: false, message: "User not found" });
            return;
        }
        const updateData = {};
        if (name !== undefined)
            updateData.name = name;
        if (email !== undefined)
            updateData.email = email;
        if (mobilenumber !== undefined)
            updateData.mobilenumber = mobilenumber;
        if (interest !== undefined)
            updateData.interest = interest;
        yield user.update(updateData);
        res.status(200).json({
            success: true,
            message: "User updated successfully",
            data: user,
        });
    }
    catch (error) {
        console.error("Error updating user:", error);
        res.status(500).json({ success: false, message: "Failed to update user" });
    }
});
exports.updateProfile = updateProfile;
const getUserProfile = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = req.params.userid;
        const user = yield db_connection_1.Auth.findByPk(userId);
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
});
exports.getUserProfile = getUserProfile;
const deleteUserProfile = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = req.params.userid;
        const user = yield db_connection_1.Auth.findByPk(userId);
        if (!user) {
            res.status(404).json({ success: false, message: "User not found" });
            return;
        }
        yield user.destroy();
        res.status(200).json({
            success: true,
            message: "User deleted successfully",
        });
    }
    catch (error) {
        console.error("Error deleting user:", error);
        res.status(500).json({ success: false, message: "Failed to delete user" });
    }
});
exports.deleteUserProfile = deleteUserProfile;
// change the settings of user given the body parameters
const changeSettings = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { user_id, personalandAccount, operator, managedata, password_security, notification_email, notification_sms, notification_personalized, language, } = req.body;
        const user = yield db_connection_1.Auth.findByPk(user_id);
        if (!user) {
            res.status(404).json({ success: false, message: "User not found" });
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
        yield user.update({ updateSetting });
        res.status(200).json({
            success: true,
            message: "Settings updated successfully",
            data: user,
        });
    }
    catch (error) {
        console.error("Error updating settings:", error);
        res
            .status(500)
            .json({ success: false, message: "Failed to update settings" });
    }
});
exports.changeSettings = changeSettings;
// when user likes any event it's get's here
const likeEvent = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { user_id, event_id } = req.body;
        const user = yield db_connection_1.User.findByPk(user_id);
        if (!user) {
            res.status(404).json({ success: false, message: "User not found" });
            return;
        }
        let isOk = yield user.addLikedEvent(event_id);
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
});
exports.likeEvent = likeEvent;
// add to interested events
const addInterested = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { user_id, interest } = req.body;
        const user = yield db_connection_1.User.findByPk(user_id);
        if (!user) {
            res.status(404).json({ success: false, message: "User not found" });
            return;
        }
        let isAdded = yield user.addInterested(interest);
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
});
exports.addInterested = addInterested;
//reserveEvents
const reserveEvent = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { user_id, event_id, date_from, date_to, name, no_of_guest, event_type, } = req.body;
        const user = yield db_connection_1.User.findByPk(user_id);
        if (!user) {
            res.status(404).json({ success: false, message: "User not found" });
            return;
        }
        let isReserved = yield db_connection_1.ReservedEvent.create({
            user_id,
            event_id,
            date_from,
            date_to,
            name,
            no_of_guest,
            event_type,
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
});
exports.reserveEvent = reserveEvent;
// visitedevents
const visitedEvents = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { user_id, event_id, date, time, location, event_type } = req.body;
        const user = yield db_connection_1.User.findByPk(user_id);
        if (!user) {
            res.status(404).json({ success: false, message: "User not found" });
            return;
        }
        let isVisited = yield db_connection_1.VisitedEvent.create({
            user_id,
            event_id,
            date,
            time,
            location,
            event_type,
        });
        if (!isVisited) {
            res
                .status(400)
                .json({ success: false, message: "Event already visited" });
            return;
        }
        res.status(200).json({
            success: true,
            message: "Event Added to visited events successfully",
        });
    }
    catch (error) {
        console.error("Error visiting event:", error);
        res.status(500).json({ success: false, message: "Failed to visit event" });
    }
});
exports.visitedEvents = visitedEvents;
// addreviews
const addReviews = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { user_id, quality_of_event, service_of_event, facilites_of_event, staffPoliteness, operator_of_event, event_name, event_id, review, location, event_type, comment, } = req.body;
        const user = yield db_connection_1.User.findByPk(user_id);
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
        let isReviewed = yield db_connection_1.Reviews.create({
            user_id,
            event_id,
            username: user.name,
            comment,
            date: new Date(),
            time: new Date().toLocaleTimeString(),
            location,
            event_type,
            event_name,
            rating,
            review,
        });
        if (!isReviewed) {
            res
                .status(400)
                .json({ success: false, message: "Event already reviewed" });
            return;
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
});
exports.addReviews = addReviews;
// recommendation
const getRecommendation = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { user_id } = req.body;
        const user = yield db_connection_1.User.findByPk(user_id);
        if (!user) {
            res.status(404).json({ success: false, message: "User not found" });
            return;
        }
        const recommendation = yield db_connection_1.Event.findAll({
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
            data: recommendation,
        });
    }
    catch (error) {
        console.error("Error fetching recommendation:", error);
        res
            .status(500)
            .json({ success: false, message: "Failed to retrieve recommendation" });
    }
});
exports.getRecommendation = getRecommendation;
// trending activity
const getTrendingActivity = (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const trending = yield db_connection_1.Logs.findAll({
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
});
exports.getTrendingActivity = getTrendingActivity;
