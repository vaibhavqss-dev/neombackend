import { Sequelize, DataTypes } from "sequelize";

export default (sequelize: Sequelize) => {
  const TrendingActivity = sequelize.define<any>(
    "trending_activity",
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      event_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      }
    },
    {
      timestamps: true,
    }
  );
  return TrendingActivity;
};
