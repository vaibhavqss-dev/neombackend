import { DataTypes, Model, Sequelize } from "sequelize";
import { Event } from "../types/Event";

export default (sequelize: Sequelize): typeof Event => {
  Event.init(
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
        type: DataTypes.TEXT, 
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
        type: DataTypes.DECIMAL(10, 7),
        allowNull: false,
      },
      longitude: {
        type: DataTypes.DECIMAL(10, 7),
        allowNull: false,
      },
      location: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      category: {
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
      avg_rating: {
        type: DataTypes.DECIMAL(3, 1),
        allowNull: false,
      },
      no_reviews: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },

      min_temperature: {
        type: DataTypes.DECIMAL(5, 2),
        allowNull: false,
      },
      max_temperature: {
        type: DataTypes.DECIMAL(5, 2),
        allowNull: false,
      },

      operator_name: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      available_seats: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      event_price: {
        type: DataTypes.INTEGER,
        allowNull: true,
        defaultValue: 2000,
      },
    },
    {
      sequelize,
      modelName: "event",
      timestamps: true,
      indexes: [
        {
          name: "idx_top_events",
          fields: [
            { name: "avg_rating", order: "DESC" },
            { name: "no_reviews", order: "DESC" },
          ],
        },
        {
          name: "idx_location",
          fields: ["latitude", "longitude"],
        },
      ],
    }
  );

  return Event;
};
