"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Event = void 0;
const sequelize_1 = require("sequelize");
class Event extends sequelize_1.Model {
    async increaseNoReviews(event_id) {
        try {
            const event = await Event.findByPk(event_id);
            if (!event) {
                console.error("Event not found");
                return false;
            }
            const newValue = event.get("no_reviews") + 1;
            event.set("no_reviews", newValue);
            await event.save();
            console.log("Event no_reviews increased");
            return true;
        }
        catch (error) {
            console.error("Error increasing no_reviews:", error);
            return false;
        }
    }
}
exports.Event = Event;
