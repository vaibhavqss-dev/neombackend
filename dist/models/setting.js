"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const setting_1 = require("../types/setting");
exports.default = (sequelize) => {
    setting_1.Setting.init({
        user_id: {
            type: sequelize_1.DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
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
            type: sequelize_1.DataTypes.STRING,
            defaultValue: "english",
            allowNull: false,
        },
    }, {
        sequelize,
        tableName: "settings",
        timestamps: true,
    });
    return setting_1.Setting;
};
