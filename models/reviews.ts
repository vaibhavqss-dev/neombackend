import { fail } from "assert";
import { Sequelize, DataTypes } from "sequelize";

export default (sequelize: Sequelize) => {
  const reviews = sequelize.define<any>(
    "reviews",
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      comment: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      avg_rating: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      date: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
      },
      time: {
        type: DataTypes.TIME,
        allowNull: false,
        defaultValue: DataTypes.NOW,
      },
      event_id: {
        type: DataTypes.INTEGER,
        allowNull: false, 
      },
    },
    {
      timestamps: true,
    }
  );
  return reviews;
};
