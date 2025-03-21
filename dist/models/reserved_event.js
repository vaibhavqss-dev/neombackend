"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
exports.default = (sequelize) => {
    const reservedEvent = sequelize.define("reserved_event", {
        id: {
            type: sequelize_1.DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        user_id: {
            type: sequelize_1.DataTypes.INTEGER,
            allowNull: false,
        },
        date_from: {
            type: sequelize_1.DataTypes.DATE,
            allowNull: false,
        },
        date_to: {
            type: sequelize_1.DataTypes.DATE,
            allowNull: false,
        },
        time: {
            type: sequelize_1.DataTypes.TIME,
            allowNull: true,
        },
        no_of_guest: {
            type: sequelize_1.DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 1,
        },
        event_id: {
            type: sequelize_1.DataTypes.INTEGER,
            allowNull: false,
        },
    }, {
        timestamps: true,
    });
    return reservedEvent;
};
