import { Sequelize, where } from "sequelize";
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
``;
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

User.hasOne(Auth, {
  foreignKey: "user_id",
  onDelete: "CASCADE",
  constraints: true,
});
Auth.belongsTo(User, {
  foreignKey: "user_id",
  onDelete: "CASCADE",
  constraints: true,
});

User.hasOne(Setting, {
  foreignKey: "user_id",
  onDelete: "CASCADE",
  constraints: true,
});
Setting.belongsTo(User, {
  foreignKey: "user_id",
  onDelete: "CASCADE",
  constraints: true,
});

// Hook to create default settings when a user is created
User.addHook("afterCreate", async (user: any, options) => {
  await Setting.create(
    {
      user_id: user.id,
    },
    {
      transaction: options.transaction,
    }
  );
});

User.hasMany(ReservedEvent, {
  foreignKey: "user_id",
  onDelete: "CASCADE",
  constraints: true,
});

ReservedEvent.belongsTo(User, {
  foreignKey: "user_id",
  onDelete: "CASCADE",
  constraints: true,
});

Event.hasMany(ReservedEvent, {
  foreignKey: "event_id",
  onDelete: "CASCADE",
  constraints: true,
});

ReservedEvent.belongsTo(Event, {
  foreignKey: "event_id",
  onDelete: "CASCADE",
  constraints: true,
});

Reviews.belongsTo(User, {
  foreignKey: "user_id",
  onDelete: "CASCADE",
  constraints: true,
});
User.hasMany(Reviews, {
  foreignKey: "user_id",
});

VisitedEvent.belongsTo(User, {
  foreignKey: "user_id",
  constraints: true,
  onDelete: "CASCADE",
});
User.hasMany(VisitedEvent, {
  foreignKey: "user_id",
  onDelete: "CASCADE",
});

VisitedEvent.belongsTo(Event, {
  foreignKey: "event_id",
});
Event.hasMany(VisitedEvent, {
  foreignKey: "event_id",
  constraints: true,
});

MyFeedback.belongsTo(User, {
  foreignKey: "user_id",
  onDelete: "CASCADE",
  constraints: true,
});
User.hasMany(MyFeedback, {
  foreignKey: "user_id",
  onDelete: "CASCADE",
  constraints: true,
});

MyFeedback.belongsTo(Event, {
  foreignKey: "event_id",
  constraints: true,
});
Event.hasMany(MyFeedback, {
  foreignKey: "event_id",
  constraints: true,
});

TrendingActivity.belongsTo(Event, {
  foreignKey: "event_id",
  constraints: true,
  onDelete: "CASCADE",
});
Event.hasMany(TrendingActivity, {
  foreignKey: "event_id",
  constraints: true,
  onDelete: "CASCADE",
});

async function testConnection() {
  try {
    await sequelize.authenticate();
    console.log("Database connection established successfully.");
    await sequelize.sync({ force: true });
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
