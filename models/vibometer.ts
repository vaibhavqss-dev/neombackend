import { Sequelize, DataTypes, Optional, Model } from "sequelize";

interface VibometerAttributes {
  id: number;
  user_id: number;
  event_id: number;
  vibe: string;
  createdAt?: Date;
  updatedAt?: Date;
}

interface VibometerCreationAttributes
  extends Optional<VibometerAttributes, "id"> {}

class Vibometer extends Model<
  VibometerAttributes,
  VibometerCreationAttributes
> {
  declare id: number;
  declare user_id: number;
  declare event_id: number;
  declare vibe: string;
  declare readonly createdAt: Date;
  declare readonly updatedAt: Date;
}

export default (sequelize: Sequelize): typeof Vibometer => {
  Vibometer.init(
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
      event_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      vibe: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "vibometers",
      timestamps: true,
    }
  );

  return Vibometer;
};
