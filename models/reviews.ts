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
      username: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      comment: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      rating: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      date: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      time: {
        type: DataTypes.TIME,
        allowNull: false,
        defaultValue: DataTypes.NOW,
      },
      location: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      event_category: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      event_id: {
        type: DataTypes.STRING,
        allowNull: false, 
        unique: true,
      },
    },
    {
      timestamps: true,
    }
  );
  return reviews;
};
