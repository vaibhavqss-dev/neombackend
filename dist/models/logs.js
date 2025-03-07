"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
exports.default = (sequelize) => {
    const logs = sequelize.define("logs", {
        id: {
            type: sequelize_1.DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        user_id: {
            type: sequelize_1.DataTypes.INTEGER,
            allowNull: false,
        },
        date: {
            type: sequelize_1.DataTypes.DATE,
            allowNull: false,
        },
        time: {
            type: sequelize_1.DataTypes.STRING,
            allowNull: false,
        },
        location: {
            type: sequelize_1.DataTypes.STRING,
            allowNull: false,
        },
        event_type: {
            type: sequelize_1.DataTypes.STRING,
            allowNull: false,
        },
        event_id: {
            type: sequelize_1.DataTypes.STRING,
            allowNull: false,
        },
        ip_address: {
            type: sequelize_1.DataTypes.STRING,
            allowNull: false,
        },
    }, {
        timestamps: true,
    });
    return logs;
};
