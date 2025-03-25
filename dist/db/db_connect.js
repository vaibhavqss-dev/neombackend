"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Notifications = exports.Recommendations = exports.TrendingActivity = exports.Event = exports.Reviews = exports.Logs = exports.Setting = exports.ReservedEvent = exports.User = exports.Auth = exports.sequelize = void 0;
exports.testConnection = testConnection;
const database_1 = require("../config/database");
Object.defineProperty(exports, "sequelize", { enumerable: true, get: function () { return database_1.sequelize; } });
const db_config_1 = require("./db_config");
Object.defineProperty(exports, "Auth", { enumerable: true, get: function () { return db_config_1.Auth; } });
Object.defineProperty(exports, "User", { enumerable: true, get: function () { return db_config_1.User; } });
Object.defineProperty(exports, "ReservedEvent", { enumerable: true, get: function () { return db_config_1.ReservedEvent; } });
Object.defineProperty(exports, "Setting", { enumerable: true, get: function () { return db_config_1.Setting; } });
Object.defineProperty(exports, "Logs", { enumerable: true, get: function () { return db_config_1.Logs; } });
Object.defineProperty(exports, "Reviews", { enumerable: true, get: function () { return db_config_1.Reviews; } });
Object.defineProperty(exports, "Event", { enumerable: true, get: function () { return db_config_1.Event; } });
Object.defineProperty(exports, "TrendingActivity", { enumerable: true, get: function () { return db_config_1.TrendingActivity; } });
Object.defineProperty(exports, "Recommendations", { enumerable: true, get: function () { return db_config_1.Recommendations; } });
Object.defineProperty(exports, "Notifications", { enumerable: true, get: function () { return db_config_1.Notifications; } });
async function testConnection() {
    try {
        await database_1.sequelize.authenticate();
        console.log("Database connection established successfully.");
        await database_1.sequelize.sync({ force: false });
        console.log("Database models synchronized.");
    }
    catch (error) {
        console.error("Unable to connect to the database:", error);
        throw error;
    }
}
