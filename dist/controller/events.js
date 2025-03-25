"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.suggestAnotherEvent = exports.deleteEvent = exports.updateEvent = exports.getEvents = exports.postEvent = void 0;
const db_connect_1 = require("../db/db_connect");
const utility_1 = require("./utility");
const sequelize_1 = require("sequelize");
const postEvent = async (_req, res) => {
    try {
        const { title, category, date, location, description, latitude, longitude, subtext, image_urls, overall_rating, min_temperature, max_temperature, avg_rating, no_reviews, } = _req.body;
        const formattedTime = (0, utility_1.getCurrentTime)();
        const newEvent = await db_connect_1.Event.create({
            title,
            category,
            time: [formattedTime],
            date,
            location,
            description,
            latitude,
            longitude,
            subtext,
            image_urls,
            overall_rating,
            min_temperature,
            max_temperature,
            avg_rating,
            no_reviews,
        });
        res.status(201).json({ success: true, data: newEvent });
    }
    catch (error) {
        console.error("Error posting event:", error);
        res.status(500).json({ success: false, message: "Failed to post event" });
    }
};
exports.postEvent = postEvent;
const getEvents = async (_req, res) => {
    try {
        const { category, title, time, date, location, event_id } = _req.query;
        const filter_event = {};
        if (category) {
            filter_event.category = category;
        }
        if (title) {
            filter_event.title = title;
        }
        if (time) {
            filter_event.time = time;
        }
        if (date) {
            filter_event.date = date;
        }
        if (location) {
            filter_event.location = location;
        }
        if (event_id) {
            filter_event.id = event_id;
        }
        const { userId: user_id } = _req.user;
        const user = await db_connect_1.User.findOne({ where: { user_id: user_id } });
        if (!user) {
            res.status(400).json({ success: false, message: "User not found" });
            return;
        }
        if (event_id != null) {
            const event = await db_connect_1.Event.findOne({
                where: { event_id: parseInt(event_id) },
                include: [
                    {
                        model: db_connect_1.Reviews,
                        required: false,
                        attributes: ["comment", "user_id", "avg_rating", "createdAt", "id"],
                        include: [
                            {
                                model: db_connect_1.User,
                                required: false,
                                attributes: ["name", "email", "profile_img"],
                            },
                        ],
                    },
                ],
            });
            res.status(200).json({ success: true, event: event });
            return;
        }
        const reservedEventIds = await db_connect_1.ReservedEvent.findAll({
            attributes: ["event_id"],
            raw: true,
        });
        const reservedIds = reservedEventIds.map((item) => item.event_id);
        if (reservedIds.length > 0) {
            filter_event.event_id = {
                [sequelize_1.Op.notIn]: reservedIds,
            };
        }
        const events = await db_connect_1.Event.findAll({
            where: {
                ...filter_event,
                event_id: {
                    [sequelize_1.Op.notIn]: [...user.likes, ...reservedIds],
                },
            },
            limit: 10,
        });
        res.status(200).json({ success: true, data: events, isFiltered: true });
    }
    catch (error) {
        console.error("Error getting events:", error);
        res.status(500).json({ success: false, message: "Failed to get events" });
    }
};
exports.getEvents = getEvents;
const updateEvent = async (_req, res) => {
    try {
        const { event_id, time, title, category, date, location, description, latitude, longitude, subtext, image_urls, overall_rating, } = _req.body;
        const update = {};
        if (title)
            update.title = title;
        if (category)
            update.category = category;
        if (date)
            update.date = date;
        if (location)
            update.location = location;
        if (description)
            update.description = description;
        if (latitude)
            update.latitude = latitude;
        if (longitude)
            update.longitude = longitude;
        if (subtext)
            update.subtext = subtext;
        if (image_urls)
            update.image_urls = image_urls;
        if (overall_rating)
            update.overall_rating = overall_rating;
        if (time)
            update.time = time;
        if (Object.keys(update).length === 0) {
            res.status(400).json({
                success: false,
                message: "Please provide an event_id to update",
            });
            return;
        }
        const updatedEvent = await db_connect_1.Event.update(update, {
            where: { event_id },
        });
        res.status(200).json({ success: true, messsage: "Event updated" });
    }
    catch (error) {
        console.error("Error updating event:", error);
        res.status(500).json({ success: false, message: "Failed to update event" });
    }
};
exports.updateEvent = updateEvent;
const deleteEvent = async (_req, res) => {
    try {
        const { event_id } = _req.query;
        if (!event_id) {
            res.status(400).json({
                success: false,
                message: "Please provide an event_id to delete",
            });
            return;
        }
        await db_connect_1.Event.destroy({ where: { event_id: parseInt(event_id) } });
        res.status(200).json({ success: true, message: "Event deleted" });
    }
    catch (error) {
        console.error("Error deleting event:", error);
        res.status(500).json({ success: false, message: "Failed to delete event" });
    }
};
exports.deleteEvent = deleteEvent;
const suggestAnotherEvent = async (_req, res) => {
    try {
        const { event_id } = _req.params;
        if (!event_id) {
            res.status(400).json({
                success: false,
                message: "Please provide an event_id to suggest another event",
            });
            return;
        }
        const nowTime = new Date().toTimeString().split(" ")[0];
        const suggestedEvent = await db_connect_1.Event.findOne({
            where: db_connect_1.sequelize.where(db_connect_1.sequelize.cast(db_connect_1.sequelize.json("time[0]"), "time"), {
                [sequelize_1.Op.gt]: nowTime,
            }),
            attributes: [
                "event_id",
                "title",
                "category",
                "time",
                "date",
                "location",
                "image_urls",
            ],
            order: [[db_connect_1.sequelize.cast(db_connect_1.sequelize.json("time[0]"), "time"), "ASC"]],
        });
        if (!suggestedEvent) {
            res.status(404).json({ success: false, message: "No New events found" });
            return;
        }
        res.status(200).json({ success: true, event: suggestedEvent });
    }
    catch (error) {
        console.error("Error suggesting another event:", error);
        res
            .status(500)
            .json({ success: false, message: "Failed to suggest another event" });
    }
};
exports.suggestAnotherEvent = suggestAnotherEvent;
