import { Sequelize, DataTypes } from "sequelize";

interface SettingAttributes {
  id: number;
  userid: number;
  personalandAccount: string;
  operator: string;
  managedata: string;
  password_security: string;
  notification_email: string;
  notification_sms: string;
  notification_personalized: string;
  language: string;
}

export default (sequelize: Sequelize) => {
  const setting = sequelize.define<any>(
    "Setting",
    {
      id: {
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
        type: DataTypes.BOOLEAN,
        defaultValue: true,
        allowNull: false,
      },
    },
    {
      tableName: "settings",
      timestamps: true,
    }
  );
  return setting;
};
