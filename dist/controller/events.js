"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteEvent = exports.updateEvent = exports.getEvents = exports.postEvent = void 0;
const db_connection_1 = require("../db/db_connection");
const utility_1 = require("./utility");
const postEvent = async (_req, res) => {
    try {
        const { title, category, date, location, description, latitude, longitude, subtext, image_urls, overall_rating, min_temprature, max_temprature, avg_rating, no_reviews, } = _req.body;
        const formattedTime = (0, utility_1.getCurrentTime)();
        const newEvent = await db_connection_1.Event.create({
            title,
            category,
            time: formattedTime,
            date,
            location,
            description,
            latitude,
            longitude,
            subtext,
            image_urls,
            overall_rating,
            min_temprature,
            max_temprature,
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
        const { category, title, time, date } = _req.query;
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
        if (Object.keys(filter_event).length === 0) {
            const events = await db_connection_1.Event.findAll({ limit: 10 });
            res.status(200).json({ success: true, data: events, isFiltered: false });
            return;
        }
        const events = await db_connection_1.Event.findAll({
            where: filter_event,
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
        const updatedEvent = await db_connection_1.Event.update(update, {
            where: { id: event_id },
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
        await db_connection_1.Event.destroy({ where: { id: event_id } });
        res.status(200).json({ success: true, message: "Event deleted" });
    }
    catch (error) {
        console.error("Error deleting event:", error);
        res.status(500).json({ success: false, message: "Failed to delete event" });
    }
};
exports.deleteEvent = deleteEvent;
