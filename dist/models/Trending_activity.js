"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
exports.default = (sequelize) => {
    const TrendingActivity = sequelize.define("trending_activity", {
        id: {
            type: sequelize_1.DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        event_id: {
            type: sequelize_1.DataTypes.STRING,
            allowNull: false,
        },
        time: {
            type: sequelize_1.DataTypes.STRING,
            allowNull: false,
        },
        date: {
            type: sequelize_1.DataTypes.DATE,
            allowNull: false,
        },
        category: {
            type: sequelize_1.DataTypes.STRING,
            allowNull: false,
        },
        location: {
            type: sequelize_1.DataTypes.STRING,
            allowNull: false,
        },
        image_urls: {
            type: sequelize_1.DataTypes.STRING,
            allowNull: false,
        },
    });
    return TrendingActivity;
};
