import { Sequelize, DataTypes, Model, Optional } from "sequelize";

interface TrendingActivityAttributes {
  id: number;
  event_id: number;
  createdAt?: Date;
  updatedAt?: Date;
}

interface TrendingActivityCreationAttributes
  extends Optional<TrendingActivityAttributes, "id"> {}

class TrendingActivity extends Model<
  TrendingActivityAttributes,
  TrendingActivityCreationAttributes
> {
  declare id: number;
  declare event_id: number;
  declare readonly createdAt: Date;
  declare readonly updatedAt: Date;
}

export default (sequelize: Sequelize): typeof TrendingActivity => {
  TrendingActivity.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      event_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "trending_activity",
      timestamps: true,
    }
  );
  return TrendingActivity;
};
