"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const Event_1 = require("../types/Event");
exports.default = (sequelize) => {
    Event_1.Event.init({
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
            type: sequelize_1.DataTypes.TEXT,
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
            type: sequelize_1.DataTypes.DECIMAL(10, 7),
            allowNull: false,
        },
        longitude: {
            type: sequelize_1.DataTypes.DECIMAL(10, 7),
            allowNull: false,
        },
        location: {
            type: sequelize_1.DataTypes.STRING,
            allowNull: false,
        },
        category: {
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
        avg_rating: {
            type: sequelize_1.DataTypes.DECIMAL(3, 1),
            allowNull: false,
        },
        no_reviews: {
            type: sequelize_1.DataTypes.INTEGER,
            allowNull: false,
        },
        min_temperature: {
            type: sequelize_1.DataTypes.DECIMAL(5, 2),
            allowNull: false,
        },
        max_temperature: {
            type: sequelize_1.DataTypes.DECIMAL(5, 2),
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
        sequelize,
        modelName: "event",
        timestamps: true,
    });
    return Event_1.Event;
};
