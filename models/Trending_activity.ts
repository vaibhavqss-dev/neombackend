import { Sequelize, DataTypes } from "sequelize";

export default (sequelize: Sequelize) => {
  const TrendingActivity = sequelize.define<any>("trending_activity", {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    event_id: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    time: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    date: {
      type: DataTypes.DATE,
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
      type: DataTypes.STRING,
      allowNull: false,
    },
  });
  return TrendingActivity;
};
