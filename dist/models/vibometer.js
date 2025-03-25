"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
class Vibometer extends sequelize_1.Model {
}
exports.default = (sequelize) => {
    Vibometer.init({
        id: {
            type: sequelize_1.DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        user_id: {
            type: sequelize_1.DataTypes.INTEGER,
            allowNull: false,
        },
        event_id: {
            type: sequelize_1.DataTypes.INTEGER,
            allowNull: false,
        },
        vibe: {
            type: sequelize_1.DataTypes.STRING,
            allowNull: false,
        },
    }, {
        sequelize,
        modelName: "vibometers",
        timestamps: true,
    });
    return Vibometer;
};
