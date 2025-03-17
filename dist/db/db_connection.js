"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MyFeedback = exports.TrendingActivity = exports.VisitedEvent = exports.Event = exports.Reviews = exports.Logs = exports.Setting = exports.ReservedEvent = exports.User = exports.Auth = exports.sequelize = void 0;
exports.testConnection = testConnection;
const sequelize_1 = require("sequelize");
const dotenv_1 = __importDefault(require("dotenv"));
const auth_1 = __importDefault(require("../models/auth"));
const user_1 = __importDefault(require("../models/user"));
const setting_1 = __importDefault(require("../models/setting"));
const reserved_event_1 = __importDefault(require("../models/reserved_event"));
const logs_1 = __importDefault(require("../models/logs"));
const reviews_1 = __importDefault(require("../models/reviews"));
const event_1 = __importDefault(require("../models/event"));
const visited_events_1 = __importDefault(require("../models/visited_events"));
const Trending_activity_1 = __importDefault(require("../models/Trending_activity"));
const myfeedback_1 = __importDefault(require("../models/myfeedback"));
``;
dotenv_1.default.config();
const DB_NAME = process.env.DB_NAME || "neom";
const DB_USER = process.env.DB_USER || "postgres";
const DB_PASSWORD = process.env.DB_PASSWORD || "admin123";
const DB_HOST = process.env.DB_HOST || "localhost";
const DB_PORT = parseInt(process.env.DB_PORT || "5432");
const DB_DIALECT = "postgres";
const sequelize = new sequelize_1.Sequelize(DB_NAME, DB_USER, DB_PASSWORD, {
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
exports.sequelize = sequelize;
const Auth = (0, auth_1.default)(sequelize);
exports.Auth = Auth;
const User = (0, user_1.default)(sequelize);
exports.User = User;
const Setting = (0, setting_1.default)(sequelize);
exports.Setting = Setting;
const ReservedEvent = (0, reserved_event_1.default)(sequelize);
exports.ReservedEvent = ReservedEvent;
const Logs = (0, logs_1.default)(sequelize);
exports.Logs = Logs;
const Reviews = (0, reviews_1.default)(sequelize);
exports.Reviews = Reviews;
const Event = (0, event_1.default)(sequelize);
exports.Event = Event;
const VisitedEvent = (0, visited_events_1.default)(sequelize);
exports.VisitedEvent = VisitedEvent;
const TrendingActivity = (0, Trending_activity_1.default)(sequelize);
exports.TrendingActivity = TrendingActivity;
const MyFeedback = (0, myfeedback_1.default)(sequelize);
exports.MyFeedback = MyFeedback;
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
        await sequelize.sync({ force: false });
        console.log("Database models synchronized.");
    }
    catch (error) {
        console.error("Unable to connect to the database:", error);
        throw error;
    }
}
