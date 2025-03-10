"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
exports.default = (sequelize) => {
    const reviews = sequelize.define("reviews", {
        id: {
            type: sequelize_1.DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        user_id: {
            type: sequelize_1.DataTypes.INTEGER,
            allowNull: false,
        },
        username: {
            type: sequelize_1.DataTypes.STRING,
            allowNull: false,
        },
        comment: {
            type: sequelize_1.DataTypes.STRING,
            allowNull: true,
        },
        rating: {
            type: sequelize_1.DataTypes.INTEGER,
            allowNull: true,
        },
        date: {
            type: sequelize_1.DataTypes.DATE,
            allowNull: false,
        },
        time: {
            type: sequelize_1.DataTypes.TIME,
            allowNull: false,
            defaultValue: sequelize_1.DataTypes.NOW,
        },
        location: {
            type: sequelize_1.DataTypes.STRING,
            allowNull: false,
        },
        event_category: {
            type: sequelize_1.DataTypes.STRING,
            allowNull: false,
        },
        event_id: {
            type: sequelize_1.DataTypes.STRING,
            allowNull: false,
            unique: true,
        },
    }, {
        timestamps: true,
    });
    return reviews;
};
