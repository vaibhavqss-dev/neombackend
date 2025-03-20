"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Recommendations = exports.TrendingActivity = exports.Event = exports.Reviews = exports.Logs = exports.ReservedEvent = exports.Setting = exports.User = exports.Auth = void 0;
const auth_1 = __importDefault(require("../models/auth"));
const user_1 = __importDefault(require("../models/user"));
const setting_1 = __importDefault(require("../models/setting"));
const reserved_event_1 = __importDefault(require("../models/reserved_event"));
const logs_1 = __importDefault(require("../models/logs"));
const reviews_1 = __importDefault(require("../models/reviews"));
const event_1 = __importDefault(require("../models/event"));
const Trending_activity_1 = __importDefault(require("../models/Trending_activity"));
const recommendations_1 = __importDefault(require("../models/recommendations"));
const database_1 = require("../config/database");
const Auth = (0, auth_1.default)(database_1.sequelize);
exports.Auth = Auth;
const User = (0, user_1.default)(database_1.sequelize);
exports.User = User;
const Setting = (0, setting_1.default)(database_1.sequelize);
exports.Setting = Setting;
const ReservedEvent = (0, reserved_event_1.default)(database_1.sequelize);
exports.ReservedEvent = ReservedEvent;
const Logs = (0, logs_1.default)(database_1.sequelize);
exports.Logs = Logs;
const Reviews = (0, reviews_1.default)(database_1.sequelize);
exports.Reviews = Reviews;
const Event = (0, event_1.default)(database_1.sequelize);
exports.Event = Event;
const TrendingActivity = (0, Trending_activity_1.default)(database_1.sequelize);
exports.TrendingActivity = TrendingActivity;
const Recommendations = (0, recommendations_1.default)(database_1.sequelize);
exports.Recommendations = Recommendations;
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
User.addHook("afterCreate", async (user, options) => {
    await Setting.create({
        user_id: user.id,
    }, {
        transaction: options.transaction,
    });
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
ReservedEvent.hasMany(Reviews, {
    foreignKey: "event_id",
    foreignKeyConstraint: false,
});
Reviews.belongsTo(User, {
    foreignKey: "user_id",
    onDelete: "CASCADE",
    constraints: true,
});
User.hasMany(Reviews, {
    foreignKey: "user_id",
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
Recommendations.belongsTo(Event, {
    foreignKey: "event_id",
    constraints: true,
    onDelete: "CASCADE",
});
