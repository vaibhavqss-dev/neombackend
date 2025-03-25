import { Sequelize, DataTypes, Model, Optional } from "sequelize";

interface LogAttributes {
  id?: number;
  user_id: string;
  location: string;
  ip_address: string;
  createdAt?: Date;
  updatedAt?: Date;
}

interface LogCreationAttributes extends Optional<LogAttributes, "id"> {}

class Log extends Model<LogCreationAttributes, LogAttributes> {
  declare id: number;
  declare user_id: string;
  declare location: string;
  declare ip_address: string;
  declare readonly createdAt: Date;
  declare readonly updatedAt: Date;
}

export default (sequelize: Sequelize): typeof Log => {
  Log.init(
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
      sequelize,
      tableName: "logs",
      timestamps: true,
    }
  );
  return Log;
};
