import { Model, DataTypes, Sequelize } from "sequelize";
import { Setting } from "../types/setting";

export default (sequelize: Sequelize): typeof Setting => {
  Setting.init(
    {
      user_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      personalandAccount: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
        allowNull: false,
      },
      operator: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
        allowNull: false,
      },
      managedata: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
        allowNull: false,
      },
      password_security: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
        allowNull: false,
      },
      notification_email: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
        allowNull: false,
      },
      notification_sms: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
        allowNull: false,
      },
      notification_personalized: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
        allowNull: false,
      },
      language: {
        type: DataTypes.STRING,
        defaultValue: "english",
        allowNull: false,
      },
    },
    {
      sequelize,
      tableName: "settings",
      timestamps: true,
    }
  );
  return Setting;
};
