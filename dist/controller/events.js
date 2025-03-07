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
exports.getEvents = exports.postEvent = void 0;
const db_connection_1 = require("../db/db_connection");
/* @param _req: Request
 * @param res: Response
 * @returns void
 */
// postevent
const postEvent = (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { title, category, time, date, location, description, latitude, longitude, subtext, image_urls, } = _req.body;
        const newEvent = yield db_connection_1.Event.create({
            title,
            category,
            time,
            date,
            location,
            description,
            latitude,
            longitude,
            subtext,
            image_urls,
        });
        res.status(201).json({ success: true, data: newEvent });
    }
    catch (error) {
        console.error("Error posting event:", error);
        res.status(500).json({ success: false, message: "Failed to post event" });
    }
});
exports.postEvent = postEvent;
const getEvents = (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { category, name, time, date } = _req.body;
        const filter_event = {};
        if (category) {
            filter_event.category = category;
        }
        if (name) {
            filter_event.name = name;
        }
        if (time) {
            filter_event.time = time;
        }
        if (date) {
            filter_event.date = date;
        }
        if (Object.keys(filter_event).length === 0) {
            const events = yield db_connection_1.Event.findAll({ limit: 10 });
            res.status(200).json({ success: true, data: events, isFiltered: false });
            return;
        }
        const events = yield db_connection_1.Event.findAll({
            where: filter_event,
        });
        res.status(200).json({ success: true, data: events, isFiltered: true });
    }
    catch (error) {
        console.error("Error getting events:", error);
        res.status(500).json({ success: false, message: "Failed to get events" });
    }
});
exports.getEvents = getEvents;
