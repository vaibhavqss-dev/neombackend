"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.seedRecommendations = exports.seedlogs = exports.seedTrendingActivity = exports.seedReviews = exports.seedReservedEvents = exports.seedsignup = void 0;
exports.seedEvents = seedEvents;
const db_connect_1 = require("../db/db_connect");
const data_1 = require("./data/data");
const seedsignup = async () => {
    try {
        for (const signupData of data_1.signup) {
            console.log(`Creating signup '${signupData.username}'...`);
            try {
                const [user, createdUser] = await db_connect_1.User.findOrCreate({
                    where: { name: signupData.name },
                    defaults: {
                        name: signupData.name,
                        email: signupData.email,
                        mobile_number: signupData.mobile_number,
                        interests: ["music", "sports"],
                        likes: ["event1", "event2"],
                        profile_img: signupData.profile_img,
                    },
                });
                const [signup, created] = await db_connect_1.Auth.findOrCreate({
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
                const [event, created] = await db_connect_1.Event.findOrCreate({
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
const seedReservedEvents = async () => {
    try {
        for (const reservedEventData of data_1.reserved_events) {
            console.log(`Creating reserved event '${reservedEventData.event_id}'...`);
            try {
                const reservedEvent = await db_connect_1.ReservedEvent.create(reservedEventData);
                console.log(`Reserved event created with ID: ${reservedEvent.id}`);
            }
            catch (err) {
                console.error(`Error creating reserved event '${reservedEventData.event_id}':`, err);
            }
        }
    }
    catch (err) {
        console.error("Error seeding reserved event data:", err);
    }
};
exports.seedReservedEvents = seedReservedEvents;
const seedReviews = async () => {
    try {
        for (const reviewData of data_1.reviews) {
            try {
                const review = await db_connect_1.Reviews.create(reviewData);
                console.log(`Review created with ID: ${review.id}`);
            }
            catch (err) {
                console.error("Error creating review:", err);
            }
        }
    }
    catch (err) {
        console.error("Error seeding review data:", err);
    }
};
exports.seedReviews = seedReviews;
const seedTrendingActivity = async () => {
    try {
        for (const trendingActivityData of data_1.trending_activity) {
            try {
                const trendingActivity = await db_connect_1.TrendingActivity.create(trendingActivityData);
                console.log(`Trending activity created with ID: ${trendingActivity.id}`);
            }
            catch (err) {
                console.error("Error creating trending activity:", err);
            }
        }
    }
    catch (err) {
        console.error("Error seeding trending activity data:", err);
    }
};
exports.seedTrendingActivity = seedTrendingActivity;
const seedlogs = async () => {
    try {
        for (const logData of data_1.logs) {
            try {
                const log = await db_connect_1.Logs.create(logData);
                console.log(`Log created with ID: ${log.id}`);
            }
            catch (err) {
                console.error("Error creating log:", err);
            }
        }
    }
    catch (err) {
        console.error("Error seeding log data:", err);
    }
};
exports.seedlogs = seedlogs;
const seedRecommendations = async () => {
    try {
        for (const recommendationData of data_1.recommendations) {
            try {
                const recommendation = await db_connect_1.Recommendations.create(recommendationData);
                console.log(`Recommendation created with ID: ${recommendation.id}`);
            }
            catch (err) {
                console.error("Error creating recommendation:", err);
            }
        }
    }
    catch (err) {
        console.error("Error seeding recommendation data:", err);
    }
};
exports.seedRecommendations = seedRecommendations;
