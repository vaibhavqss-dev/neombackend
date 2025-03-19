import { Sequelize, DataTypes } from "sequelize";

export default (sequelize: Sequelize) => {
  const logs = sequelize.define<any>(
    "logs",
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      user_id: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      location: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      ip_address: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      tableName: "logs",
      timestamps: true,
    }
  );
  return logs;
};
