import { Sequelize, DataTypes } from "sequelize";

export default (sequelize: Sequelize) => {
  const event = sequelize.define<any>(
    "event",
    {
      event_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      title: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      description: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      subtext: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      date: {
        type: DataTypes.JSON,
        allowNull: false,
        defaultValue: [],
      },
      time: {
        type: DataTypes.JSON,
        allowNull: false,
        defaultValue: [],
      },
      latitude: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      longitude: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      category: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      location: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      image_urls: {
        type: DataTypes.JSON,
        allowNull: false,
        defaultValue: [],
      },
      overall_rating: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      min_temprature: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      max_temprature: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      avg_rating: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      no_reviews: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      timestamps: true,
    }
  );
  return event;
};
