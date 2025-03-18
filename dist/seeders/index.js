"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const db_connection_1 = require("../db/db_connection");
const seeder_1 = require("./seeder");
async function runSeeders() {
    try {
        console.log("Starting database seeding...");
        console.log("Checking database connection...");
        await db_connection_1.sequelize.authenticate();
        console.log("Database connection has been established successfully.");
        console.log("Syncing models with database...");
        await db_connection_1.sequelize.sync();
        await (0, seeder_1.seedEvents)();
        console.log("All seeders completed successfully!");
        process.exit(0);
    }
    catch (error) {
        console.error("Error running seeders:", error);
        process.exit(1);
    }
}
runSeeders();
