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
        quality_of_event: {
            type: sequelize_1.DataTypes.INTEGER,
            allowNull: false,
        },
        service_of_event: {
            type: sequelize_1.DataTypes.INTEGER,
            allowNull: false,
        },
        facilites_of_event: {
            type: sequelize_1.DataTypes.INTEGER,
            allowNull: false,
        },
        staffPoliteness: {
            type: sequelize_1.DataTypes.INTEGER,
            allowNull: false,
        },
        operator_of_event: {
            type: sequelize_1.DataTypes.INTEGER,
            allowNull: false,
        },
        user_id: {
            type: sequelize_1.DataTypes.INTEGER,
            allowNull: false,
        },
        comment: {
            type: sequelize_1.DataTypes.STRING,
            allowNull: true,
        },
        avg_rating: {
            type: sequelize_1.DataTypes.FLOAT,
            allowNull: false,
        },
        date: {
            type: sequelize_1.DataTypes.DATE,
            allowNull: false,
            defaultValue: sequelize_1.DataTypes.NOW,
        },
        time: {
            type: sequelize_1.DataTypes.TIME,
            allowNull: false,
            defaultValue: sequelize_1.DataTypes.NOW,
        },
        event_id: {
            type: sequelize_1.DataTypes.INTEGER,
            allowNull: false,
        },
    }, {
        timestamps: true,
        hooks: {
            beforeCreate: async (reviews) => {
                reviews.avg_rating =
                    (reviews.quality_of_event +
                        reviews.service_of_event +
                        reviews.facilites_of_event +
                        reviews.staffPoliteness +
                        reviews.operator_of_event) /
                        5;
            },
        },
    });
    return reviews;
};
