"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
exports.default = (sequelize) => {
    const myfeedback = sequelize.define("myfeedback", {
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
            allowNull: false,
        },
        rating: {
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
            type: sequelize_1.DataTypes.INTEGER,
            allowNull: false,
        },
    }, {
        timestamps: true,
    });
    return myfeedback;
};
