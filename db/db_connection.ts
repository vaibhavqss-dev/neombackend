import { Sequelize } from "sequelize";
import dotenv from "dotenv";
import AuthModel from "../models/auth";
import UserModel from "../models/user";
import SettingModel from "../models/setting";
import ReservedEventModel from "../models/reserved_event";
import LogsModel from "../models/logs";
import ReviewsModel from "../models/reviews";
import EventModel from "../models/event";
import VisitedEventModel from "../models/visited_events";
import TrendingActivityModel from "../models/Trending_activity";
import MyFeedbackModel from "../models/myfeedback";

dotenv.config();
const DB_NAME = process.env.DB_NAME || "neom";
const DB_USER = process.env.DB_USER || "postgres";
const DB_PASSWORD = process.env.DB_PASSWORD || "admin123";
const DB_HOST = process.env.DB_HOST || "localhost";
const DB_PORT = parseInt(process.env.DB_PORT || "5432");
const DB_DIALECT = "postgres";

const sequelize = new Sequelize(DB_NAME, DB_USER, DB_PASSWORD, {
  host: DB_HOST,
  port: DB_PORT,
  dialect: DB_DIALECT,
  logging: false,
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
});

const Auth = AuthModel(sequelize);
const User = UserModel(sequelize);
const Setting = SettingModel(sequelize);
const ReservedEvent = ReservedEventModel(sequelize);
const Logs = LogsModel(sequelize);
const Reviews = ReviewsModel(sequelize);
const Event = EventModel(sequelize);
const VisitedEvent = VisitedEventModel(sequelize);
const TrendingActivity = TrendingActivityModel(sequelize);
const MyFeedback = MyFeedbackModel(sequelize);

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
};
