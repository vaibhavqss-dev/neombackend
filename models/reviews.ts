import { fail } from "assert";
import { Sequelize, DataTypes } from "sequelize";
import { Hooks } from "sequelize/types/hooks";

export default (sequelize: Sequelize) => {
  const reviews = sequelize.define<any>(
    "reviews",
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },

      quality_of_event: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      service_of_event: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      facilites_of_event: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      staffPoliteness: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      operator_of_event: {
        type: DataTypes.INTEGER,
        allowNull: false,
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
        type: DataTypes.FLOAT,
        allowNull: true,
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
      hooks: {
        beforeCreate: async (reviews: any) => {
          reviews.avg_rating =
            (reviews.quality_of_event +
              reviews.service_of_event +
              reviews.facilites_of_event +
              reviews.staffPoliteness +
              reviews.operator_of_event) /
            5;
        },
      },
    }
  );

  return reviews;
};
