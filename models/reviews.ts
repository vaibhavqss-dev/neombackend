import { Sequelize, DataTypes, Optional, Model } from "sequelize";

interface ReviewAttributes {
  id?: number;
  quality_of_event: number;
  service_of_event: number;
  facilites_of_event: number;
  staffPoliteness: number;
  operator_of_event: number;
  user_id: number;
  comment: string;
  avg_rating: number;
  date: String;
  time: String;
  event_id: number;
  createdAt?: Date;
  updatedAt?: Date;
}

interface ReviewCreationAttributes extends Optional<ReviewAttributes, "id"> {}
class Review extends Model<ReviewAttributes, ReviewCreationAttributes> {
  declare id: number;
  declare quality_of_event: number;
  declare service_of_event: number;
  declare facilites_of_event: number;
  declare staffPoliteness: number;
  declare operator_of_event: number;
  declare user_id: number;
  declare comment: string;
  declare avg_rating: number;
  declare date: String;
  declare time: String;
  declare event_id: number;
}

export default (sequelize: Sequelize): typeof Review => {
  Review.init(
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
      sequelize,
      modelName: "reviews",
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

  return Review;
};
