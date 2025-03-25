import { DataTypes, Sequelize } from "sequelize";
import bcrypt from "bcrypt";

import { Auth } from "../types/Auth";

export default (sequelize: Sequelize): typeof Auth => {
  Auth.init(
    {
      user_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
          notEmpty: true,
        },
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          len: [6, 100],
        },
      },
      fullname: {
        type: DataTypes.STRING,
        allowNull: true,
        validate: {
          notEmpty: true,
        },
      },
    },
    {
      sequelize,
      modelName: "Auth",
      timestamps: true,
      hooks: {
        beforeCreate: async (auth: Auth) => {
          if (auth.password) {
            const salt = await bcrypt.genSalt(10);
            auth.password = await bcrypt.hash(auth.password, salt);
          }
        },
        beforeUpdate: async (auth: Auth) => {
          if (auth.changed("password")) {
            const salt = await bcrypt.genSalt(10);
            auth.password = await bcrypt.hash(auth.password, salt);
          }
        },
      },
    }
  );

  return Auth;
};
