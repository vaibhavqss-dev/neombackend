import { sequelize } from "../db/db_connect";
import {
  seedEvents,
  seedlogs,
  seedRecommendations,
  seedReservedEvents,
  seedReviews,
  seedsignup,
  seedTrendingActivity,
} from "./seeder";

async function runSeeders() {
  try {
    console.log("Starting database seeding...");

    // Test database connection
    console.log("Checking database connection...");
    await sequelize.authenticate();
    console.log("Database connection has been established successfully.");

    // Sync models with database
    console.log("Syncing models with database...");
    await sequelize.sync({ force: true });

    // Run seeders
    await seedsignup();
    await seedEvents();
    await seedReservedEvents();
    await seedReviews();
    await seedTrendingActivity();
    await seedlogs();
    await seedRecommendations();

    console.log("All seeders completed successfully!");
    process.exit(0);
  } catch (error) {
    console.error("Error running seeders:", error);
    process.exit(1);
  }
}

runSeeders();
