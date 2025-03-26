import { Sequelize, DataTypes, Optional, Model } from "sequelize";

interface ReservedEventAttributes {
  id: number;
  user_id: number;
  event_id: number;
  date_from: Date;
  date_to: Date;
  time: String;
  start: Date;
  no_of_guest: number;
  is_attended: boolean;
  is_cancelled: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

interface ReservedEventCreationAttributes
  extends Optional<ReservedEventAttributes, "id"> {}

class ReservedEvent
  extends Model<ReservedEventAttributes, ReservedEventCreationAttributes>
  implements ReservedEventAttributes
{
  declare id: number;
  declare user_id: number;
  declare event_id: number;
  declare date_from: Date;
  declare date_to: Date;
  declare time: String;
  declare start: Date;
  declare no_of_guest: number;
  declare is_attended: boolean;
  declare is_cancelled: boolean;

  declare readonly createdAt: Date;
  declare readonly updatedAt: Date;
}

export default (sequelize: Sequelize) => {
  const reservedEvent = sequelize.define<any>(
    "reserved_event",
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
      date_from: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      date_to: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      time: {
        type: DataTypes.TIME,
        allowNull: true,
      },
      no_of_guest: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 1,
      },
      event_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      is_attended: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
        defaultValue: false,
      },
      is_cancelled: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
        defaultValue: false,
      },
    },
    {
      timestamps: true,
    }
  );
  return reservedEvent;
};
