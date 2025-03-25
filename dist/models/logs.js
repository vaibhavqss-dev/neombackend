"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
class Log extends sequelize_1.Model {
}
exports.default = (sequelize) => {
    Log.init({
        id: {
            type: sequelize_1.DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        user_id: {
            type: sequelize_1.DataTypes.STRING,
            allowNull: false,
        },
        location: {
            type: sequelize_1.DataTypes.STRING,
            allowNull: true,
        },
        ip_address: {
            type: sequelize_1.DataTypes.STRING,
            allowNull: false,
        },
    }, {
        sequelize,
        tableName: "logs",
        timestamps: true,
    });
    return Log;
};
