"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
exports.default = (sequelize) => {
    const event = sequelize.define("event", {
        event_id: {
            type: sequelize_1.DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        title: {
            type: sequelize_1.DataTypes.STRING,
            allowNull: false,
        },
        description: {
            type: sequelize_1.DataTypes.STRING,
            allowNull: false,
        },
        subtext: {
            type: sequelize_1.DataTypes.STRING,
            allowNull: false,
        },
        date: {
            type: sequelize_1.DataTypes.JSON,
            allowNull: false,
            defaultValue: [],
        },
        time: {
            type: sequelize_1.DataTypes.JSON,
            allowNull: false,
            defaultValue: [],
        },
        latitude: {
            type: sequelize_1.DataTypes.STRING,
            allowNull: false,
        },
        longitude: {
            type: sequelize_1.DataTypes.STRING,
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
            type: sequelize_1.DataTypes.JSON,
            allowNull: false,
            defaultValue: [],
        },
        overall_rating: {
            type: sequelize_1.DataTypes.INTEGER,
            allowNull: false,
        },
        min_temprature: {
            type: sequelize_1.DataTypes.STRING,
            allowNull: false,
        },
        max_temprature: {
            type: sequelize_1.DataTypes.STRING,
            allowNull: false,
        },
        avg_rating: {
            type: sequelize_1.DataTypes.STRING,
            allowNull: false,
        },
        no_reviews: {
            type: sequelize_1.DataTypes.STRING,
            allowNull: false,
        },
        operator_name: {
            type: sequelize_1.DataTypes.STRING,
            allowNull: true,
        },
        available_seats: {
            type: sequelize_1.DataTypes.INTEGER,
            allowNull: true,
        },
    }, {
        timestamps: true,
    });
    return event;
};
