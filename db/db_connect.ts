import { sequelize } from "../config/database";
 
import {
  Auth,
  User,
  ReservedEvent,
  Setting,
  Logs,
  Reviews,
  Event,
  VisitedEvent,
  TrendingActivity,
  MyFeedback,
  Recommendations,
} from "./db_config";
 
async function testConnection() {
  try {
    await sequelize.authenticate();
    console.log("Database connection established successfully.");
    await sequelize.sync({ force: false });
    console.log("Database models synchronized.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
    throw error;
  }
} 
 
export {
  sequelize,
  testConnection,
  Auth,
  User,
  ReservedEvent,
  Setting,
  Logs,
  Reviews,
  Event,
  VisitedEvent,
  TrendingActivity,
  MyFeedback,
  Recommendations,
};