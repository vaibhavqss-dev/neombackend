"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.rescheduleEvent = exports.vibometer = exports.getReservedEvents = exports.getTrendingActivity = exports.getRecommendation = exports.getReviews = exports.addReviews = exports.fetchVisitedEvents = exports.reserveEvent = exports.addInterested = exports.getLikeEvent = exports.UnlikeEvent = exports.likeEvent = exports.changeSettings = exports.getUserSettings = exports.deleteUserProfile = exports.getUserProfile = exports.updateProfile_img = exports.updateProfile = void 0;
const db_connect_1 = require("../db/db_connect");
const sequelize_1 = require("sequelize");
const updateProfile = async (req, res) => {
    try {
        const { userId: user_id } = req.user;
        const { name, email, mobilenumber, interests, dob, profile_img } = req.body;
        const user = await db_connect_1.User.findByPk(user_id);
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
        if (dob !== undefined)
            updateData.dob = dob;
        if (profile_img !== undefined)
            updateData.profile_img = profile_img;
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
const get_signed_url_1 = require("../services/get_signed_url");
const db_config_1 = require("../db/db_config");
const updateProfile_img = async (req, res) => {
    try {
        const { userId: user_id } = req.user;
        const { profile_img_name } = req.body;
        if (!profile_img_name) {
            res.status(400).json({
                success: false,
                message: "Profile image name is required",
            });
            return;
        }
        const user = await db_connect_1.User.findByPk(user_id);
        if (!user) {
            res.status(404).json({ success: false, message: "User not found" });
            return;
        }
        const signedUrlData = await (0, get_signed_url_1.getSignedUrl)(user_id.toString(), profile_img_name);
        if (!signedUrlData) {
            res.status(500).json({
                success: false,
                message: "Failed to generate upload URL. Please check server logs.",
            });
            return;
        }
        res.status(200).json({
            success: true,
            message: "Profile image upload URL generated successfully",
            uploadUrl: signedUrlData.signedUrl,
            publicUrl: `https://oplsgvveavucoyuifbte.supabase.co/storage/v1/object/public/neom-images/${signedUrlData.path}`,
        });
    }
    catch (error) {
        console.error("Error updating user profile image:", error);
        res.status(500).json({ success: false, message: "Failed to update user" });
    }
};
exports.updateProfile_img = updateProfile_img;
const getUserProfile = async (req, res) => {
    try {
        const { userId: user_id } = req.user;
        const user = await db_connect_1.User.findByPk(user_id);
        if (!user) {
            res.status(404).json({ success: false, message: "User not found" });
            return;
        }
        res.status(200).json({
            success: true,
            message: "User retrieved successfully",
            profile: user,
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
        const user = await db_connect_1.User.findByPk(user_id);
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
const getUserSettings = async (req, res) => {
    try {
        const { userId: user_id } = req.user;
        const user = await db_connect_1.Auth.findByPk(user_id);
        if (!user) {
            res.status(404).json({ success: false, message: "User not found" });
            return;
        }
        const settings = await db_connect_1.Setting.findOne({ where: { user_id } });
        if (!settings) {
            res.status(404).json({ success: false, message: "Settings not found" });
            return;
        }
        res.status(200).json({
            success: true,
            message: "Settings retrieved successfully",
            settings: settings,
        });
    }
    catch (error) {
        console.error("Error fetching settings:", error);
        res
            .status(500)
            .json({ success: false, message: "Failed to retrieve settings" });
    }
};
exports.getUserSettings = getUserSettings;
const changeSettings = async (req, res) => {
    try {
        const { userId: user_id } = req.user;
        const { personalandAccount, operator, managedata, password_security, notification_email, notification_sms, notification_personalized, language, } = req.body;
        const setting = await db_connect_1.Setting.findOne({ where: { user_id } });
        if (!setting) {
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
        const updatedSettings = await setting.update(updateSetting);
        res.status(200).json({
            success: true,
            message: "Settings updated successfully",
            updated_fields: updateSetting,
            updatedSettings,
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
        const user = await db_connect_1.User.findOne({ where: { id: user_id } });
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
const UnlikeEvent = async (req, res) => {
    try {
        const { userId: user_id } = req.user;
        const { event_id } = req.body;
        const user = await db_connect_1.User.findOne({ where: { id: user_id } });
        if (!user) {
            res.status(404).json({ success: false, message: "User not found" });
            return;
        }
        let isOk = await user.UnlikeEvent(event_id);
        if (!isOk) {
            res
                .status(400)
                .json({ success: false, message: "No Event present with given Id" });
            return;
        }
        res.status(200).json({
            success: true,
            message: "Event removed from liked events successfully",
        });
    }
    catch (error) {
        console.error("Error unliking event:", error);
        res.status(500).json({ success: false, message: "Failed to unlike event" });
    }
};
exports.UnlikeEvent = UnlikeEvent;
const getLikeEvent = async (req, res) => {
    try {
        const { userId: user_id } = req.user;
        let likes = await db_connect_1.User.findOne({
            where: { id: user_id },
            attributes: ["likes"],
        });
        if (!likes) {
            res.status(404).json({ success: false, message: "No liked events" });
            return;
        }
        const likedEvents = await db_connect_1.Event.findAll({
            where: {
                event_id: {
                    [sequelize_1.Op.in]: likes.likes,
                },
            },
        });
        res.status(200).json({
            success: true,
            message: "Liked events retrieved successfully",
            events: likedEvents,
        });
    }
    catch (error) {
        console.error("Error fetching liked events:", error);
        res
            .status(500)
            .json({ success: false, message: "Failed to fetch liked events" });
    }
};
exports.getLikeEvent = getLikeEvent;
const addInterested = async (req, res) => {
    try {
        const { userId: user_id } = req.user;
        const { interest } = req.body;
        const user = await db_connect_1.User.findByPk(user_id);
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
        const user = await db_connect_1.User.findByPk(user_id);
        if (!user) {
            res.status(404).json({ success: false, message: "User not found" });
            return;
        }
        let isReserved = await db_connect_1.ReservedEvent.create({
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
        const user = await db_connect_1.User.findByPk(user_id);
        if (!user) {
            res.status(404).json({ success: false, message: "User not found" });
            return;
        }
        let isVisited = await db_connect_1.ReservedEvent.findAll({
            where: {
                user_id,
                date_to: {
                    [sequelize_1.Op.lt]: new Date(),
                },
            },
            include: [
                {
                    model: db_connect_1.Event,
                    required: true,
                },
                {
                    model: db_connect_1.Reviews,
                    where: {
                        user_id: user_id,
                    },
                },
            ],
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
        const { quality_of_event, service_of_event, facilites_of_event, staffPoliteness, operator_of_event, event_id, comment, } = req.body;
        const user = await db_connect_1.User.findByPk(user_id);
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
            let isReviewed = await db_connect_1.Reviews.create({
                user_id,
                event_id,
                comment,
                date: new Date(),
                time: new Date().toLocaleTimeString(),
                avg_rating: rating,
                quality_of_event,
                service_of_event,
                facilites_of_event,
                staffPoliteness,
                operator_of_event,
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
        const reviews = await db_connect_1.Reviews.findAll({
            where: query,
            include: [
                {
                    model: db_connect_1.Event,
                    required: false,
                    attributes: [
                        "event_id",
                        "title",
                        "location",
                        "category",
                        "date",
                        "description",
                        "image_urls",
                        "subtext",
                    ],
                },
            ],
            limit: 5,
            attributes: ["time", "date", "comment", "avg_rating"],
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
        const user = await db_connect_1.User.findByPk(userId);
        if (!user) {
            res.status(404).json({ success: false, message: "User not found" });
            return;
        }
        const reservedEvents = await db_connect_1.ReservedEvent.findAll({
            where: { user_id: userId },
            attributes: ["event_id"],
        });
        const reservedEventIds = reservedEvents.map((event) => event.event_id);
        const recommendation = await db_connect_1.Recommendations.findAll({
            limit: 5,
            include: [
                {
                    model: db_connect_1.Event,
                    required: true,
                    where: reservedEventIds.length > 0
                        ? {
                            event_id: {
                                [sequelize_1.Op.notIn]: reservedEventIds,
                            },
                        }
                        : {},
                },
            ],
        });
        if (!recommendation || recommendation.length === 0) {
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
        const events = await db_connect_1.TrendingActivity.findAll({
            limit: 5,
            include: [
                {
                    model: db_connect_1.Event,
                    required: true,
                },
            ],
        });
        if (!events) {
            res.status(404).json({ success: false, message: "No trending events" });
            return;
        }
        res.status(200).json({
            success: true,
            message: "Trending events retrieved successfully",
            events: events,
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
        const IsCoordinates = req.query.coordinates || false;
        const { userId: user_id } = req.user;
        const reservedEvents = await db_connect_1.ReservedEvent.findAll({
            where: {
                user_id,
                date_to: {
                    [sequelize_1.Op.gt]: new Date(),
                },
            },
            include: [
                {
                    model: db_connect_1.Event,
                    required: true,
                },
            ],
            limit: 20,
        });
        if (reservedEvents.length === 0) {
            res.status(404).json({ success: false, message: "No reserved events" });
            return;
        }
        if (IsCoordinates) {
            const coordinates = reservedEvents.map((event) => {
                return {
                    event: event.event,
                };
            });
            res.status(200).json({
                success: true,
                message: "Reserved events retrieved successfully",
                events: coordinates,
            });
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
const vibometer = async (req, res) => {
    try {
        const { userId: user_id } = req.user;
        const { event_id, vibe } = req.body;
        const user = await db_connect_1.User.findByPk(user_id);
        if (!user) {
            res.status(404).json({ success: false, message: "User not found" });
            return;
        }
        let isVibometer = await db_config_1.Vibometer.create({
            event_id,
            user_id,
            vibe,
        });
        if (!isVibometer) {
            res
                .status(400)
                .json({ success: false, message: "Vibometer already exists" });
            return;
        }
        res.status(200).json({
            success: true,
            message: "Vibometer Added successfully",
        });
    }
    catch (error) {
        console.error("Error adding vibometer:", error);
        res
            .status(500)
            .json({ success: false, message: "Failed to add vibometer" });
    }
};
exports.vibometer = vibometer;
const rescheduleEvent = async (req, res) => {
    try {
        const { userId: user_id } = req.user;
        const { event_id, date, time, no_of_guest } = req.body;
        const user = await db_connect_1.User.findByPk(user_id);
        if (!user) {
            res.status(404).json({ success: false, message: "User not found" });
            return;
        }
        const reservedEvent = await db_connect_1.ReservedEvent.findOne({
            where: { user_id, event_id },
        });
        if (!reservedEvent) {
            res
                .status(404)
                .json({
                success: false,
                message: "Event not found in reserved events",
            });
            return;
        }
        await reservedEvent.update({ date, time, no_of_guest });
        res.status(200).json({
            success: true,
            message: "Event rescheduled successfully",
        });
    }
    catch (error) {
        console.error("Error rescheduling event:", error);
        res
            .status(500)
            .json({ success: false, message: "Failed to reschedule event" });
    }
};
exports.rescheduleEvent = rescheduleEvent;
