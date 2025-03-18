import { Sequelize, DataTypes } from "sequelize";

interface ReservedEventAttributes {
  id: number;
  title: string;
  start: Date;
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
      no_of_guest: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 1,
      },
    },
    {
      timestamps: true,
    }
  );
  return reservedEvent;
};
