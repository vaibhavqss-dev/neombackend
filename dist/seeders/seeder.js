"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.seedReviews = exports.seedsignup = void 0;
exports.seedEvents = seedEvents;
const db_connection_1 = require("../db/db_connection");
const data_1 = require("./data/data");
const seedsignup = async () => {
    try {
        for (const signupData of data_1.signup) {
            console.log(`Creating signup '${signupData.username}'...`);
            try {
                const [user, createdUser] = await db_connection_1.User.findOrCreate({
                    where: { name: signupData.name },
                    defaults: {
                        name: signupData.name,
                        email: signupData.email,
                        mobile_number: signupData.mobile_number,
                        interests: ["music", "sports"],
                        likes: ["event1", "event2"],
                    },
                });
                const [signup, created] = await db_connection_1.Auth.findOrCreate({
                    where: { user_id: user.id },
                    defaults: signupData,
                });
                if (created) {
                    console.log(`signup created with ID: ${signup.id}`);
                }
                else {
                    console.log(`signup '${signupData.username}' already exists.`);
                }
            }
            catch (err) {
                console.error(`Error creating signup '${signupData.username}':`, err);
            }
        }
    }
    catch (err) {
        console.error("Error seeding signup data:", err);
    }
};
exports.seedsignup = seedsignup;
async function seedEvents() {
    console.log("Seeding events data...");
    try {
        for (const eventData of data_1.events) {
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
const seedReviews = async () => {
    try {
        for (const reviewData of data_1.reviews) {
            console.log(`Creating review for event '${reviewData.event_name}'...`);
            try {
                const review = await db_connection_1.Reviews.create(reviewData);
                console.log(`Review created with ID: ${review.id}`);
            }
            catch (err) {
                console.error(`Error creating review for event '${reviewData.event_name}':`, err);
            }
        }
    }
    catch (err) {
        console.error("Error seeding review data:", err);
    }
};
exports.seedReviews = seedReviews;
