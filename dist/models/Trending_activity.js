"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
class TrendingActivity extends sequelize_1.Model {
}
exports.default = (sequelize) => {
    TrendingActivity.init({
        id: {
            type: sequelize_1.DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        event_id: {
            type: sequelize_1.DataTypes.INTEGER,
            allowNull: false,
        },
    }, {
        sequelize,
        modelName: "trending_activity",
        timestamps: true,
    });
    return TrendingActivity;
};
