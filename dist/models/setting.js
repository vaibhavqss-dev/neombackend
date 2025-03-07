"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
exports.default = (sequelize) => {
    const setting = sequelize.define("Setting", {
        id: {
            type: sequelize_1.DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        userid: {
            type: sequelize_1.DataTypes.INTEGER,
            allowNull: false,
        },
        personalandAccount: {
            type: sequelize_1.DataTypes.BOOLEAN,
            defaultValue: true,
            allowNull: false,
        },
        operator: {
            type: sequelize_1.DataTypes.BOOLEAN,
            defaultValue: true,
            allowNull: false,
        },
        managedata: {
            type: sequelize_1.DataTypes.BOOLEAN,
            defaultValue: true,
            allowNull: false,
        },
        password_security: {
            type: sequelize_1.DataTypes.BOOLEAN,
            defaultValue: true,
            allowNull: false,
        },
        notification_email: {
            type: sequelize_1.DataTypes.BOOLEAN,
            defaultValue: true,
            allowNull: false,
        },
        notification_sms: {
            type: sequelize_1.DataTypes.BOOLEAN,
            defaultValue: true,
            allowNull: false,
        },
        notification_personalized: {
            type: sequelize_1.DataTypes.BOOLEAN,
            defaultValue: true,
            allowNull: false,
        },
        language: {
            type: sequelize_1.DataTypes.BOOLEAN,
            defaultValue: true,
            allowNull: false,
        },
    }, {
        tableName: "settings",
        timestamps: true,
    });
    return setting;
};
