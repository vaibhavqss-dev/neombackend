"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
class Recommendation extends sequelize_1.Model {
}
exports.default = (sequelize) => {
    Recommendation.init({
        id: {
            type: sequelize_1.DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        user_id: {
            type: sequelize_1.DataTypes.INTEGER,
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
        sequelize,
        timestamps: true,
    });
    return Recommendation;
};
