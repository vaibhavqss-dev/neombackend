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
import recommendationsModel from "../models/recommendations";
import { sequelize } from "../config/database";

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
const Recommendations = recommendationsModel(sequelize);

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

Reviews.belongsTo(Event, {
  foreignKey: "event_id",
  constraints: true,
});
Event.hasMany(Reviews, {
  foreignKey: "event_id",
  constraints: true,
});

TrendingActivity.belongsTo(Event, {
  foreignKey: "event_id",
  constraints: true,
  onDelete: "CASCADE",
});


export {
  Auth,
  User,
  Setting,
  ReservedEvent,
  Logs,
  Reviews,
  Event,
  VisitedEvent, 
  TrendingActivity,
  MyFeedback,
  Recommendations,
};