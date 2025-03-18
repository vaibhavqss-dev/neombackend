"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.seedEvents = seedEvents;
const db_connection_1 = require("../db/db_connection");
const events_1 = require("./data/events");
async function seedEvents() {
    console.log("Seeding events data...");
    try {
        for (const eventData of events_1.events) {
            console.log(`Creating event '${eventData.title}'...`);
            try {
                const [event, created] = await db_connection_1.Event.findOrCreate({
                    where: { title: eventData.title },
                    defaults: eventData,
                });
                if (created) {
                    console.log(`Event created with ID: ${event.id}`);
                }
                else {
                    console.log(`Event '${eventData.title}' already exists.`);
                }
            }
            catch (err) {
                console.error(`Error creating event '${eventData.title}':`, err);
            }
        }
        console.log("Events seeding completed successfully!");
    }
    catch (error) {
        console.error("Error seeding events data:", error);
    }
}
