"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const db_connect_1 = require("../db/db_connect");
const seeder_1 = require("./seeder");
async function runSeeders() {
    try {
        console.log("Starting database seeding...");
        console.log("Checking database connection...");
        await db_connect_1.sequelize.authenticate();
        console.log("Database connection has been established successfully.");
        console.log("Syncing models with database...");
        await db_connect_1.sequelize.sync({ force: true });
        await (0, seeder_1.seedsignup)();
        await (0, seeder_1.seedEvents)();
        await (0, seeder_1.seedReservedEvents)();
        await (0, seeder_1.seedReviews)();
        await (0, seeder_1.seedTrendingActivity)();
        await (0, seeder_1.seedlogs)();
        await (0, seeder_1.seedRecommendations)();
        console.log("All seeders completed successfully!");
        process.exit(0);
    }
    catch (error) {
        console.error("Error running seeders:", error);
        process.exit(1);
    }
}
runSeeders();
