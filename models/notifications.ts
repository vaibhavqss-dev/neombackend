import { Model, Optional, DataTypes, Sequelize } from "sequelize";

interface NotificationAttributes {
  notification_id: number;
  user_id: number;
  description: string;
  is_read: boolean;
  message_id: number;
}

interface NotificationCreationAttributes
  extends Optional<NotificationAttributes, "notification_id"> {}

export class Notification
  extends Model<NotificationAttributes, NotificationCreationAttributes>
  implements NotificationAttributes
{
  declare notification_id: number;
  declare user_id: number;
  declare description: string;
  declare is_read: boolean;
  declare message_id: number;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

export default (sequelize: Sequelize): typeof Notification => {
  Notification.init(
    {
      notification_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      description: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      is_read: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
        defaultValue: false,
      },
      message_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
    },
    {
      sequelize,
      tableName: "notifications",
      timestamps: true,
    }
  );

  return Notification;
};
