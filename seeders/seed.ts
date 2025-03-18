import { sequelize } from "../db/db_connection";
import { seedEvents, seedReviews, seedsignup } from "./seeder";

async function runSeeders() {
  try {
    console.log("Starting database seeding...");

    // Test database connection
    console.log("Checking database connection...");
    await sequelize.authenticate();
    console.log("Database connection has been established successfully.");

    // Sync models with database
    console.log("Syncing models with database...");
    await sequelize.sync();

    // Run seeders
    await seedEvents();
    await seedsignup();
    await seedReviews();

    console.log("All seeders completed successfully!");
    process.exit(0);
  } catch (error) {
    console.error("Error running seeders:", error);
    process.exit(1);
  }
}

runSeeders();
