import { Sequelize, DataTypes, Optional, Model } from "sequelize";

interface RecommendationAttributes {
  id: number;
  user_id: number;
  event_type: string;
  event_id: number;
  createdAt?: Date;
  updatedAt?: Date;
}

interface RecommendationCreationAttributes
  extends Optional<RecommendationAttributes, "id"> {}

class Recommendation extends Model<
  RecommendationAttributes,
  RecommendationCreationAttributes
> {
  declare id: number;
  declare user_id: number;
  declare event_type: string;
  declare event_id: number;
  declare readonly createdAt: Date;
  declare readonly updatedAt: Date;
}

export default (sequelize: Sequelize): typeof Recommendation => {
  Recommendation.init(
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
      event_type: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      event_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      sequelize,
      timestamps: true,
    }
  );
  return Recommendation;
};
