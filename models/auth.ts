import { Model, DataTypes, Sequelize, Optional } from "sequelize";
import bcrypt from "bcrypt";

interface IAuthAttributes {
  id: number;
  username: string;
  password: string;
  createdAt: Date;
  updatedAt: Date;
}

// For optional fields in create operations
interface IAuthCreationAttributes
  extends Optional<IAuthAttributes, "id" | "createdAt" | "updatedAt"> {}

// export interface IAuthInstance
//   extends Model<IAuthAttributes, IAuthCreationAttributes> {
//   id: number;
//   username: string;
//   password: string;
//   createdAt: Date;
//   updatedAt: Date;
//   comparePassword(candidatePassword: string): Promise<boolean>;
//   changed(key: string): boolean;
// }

export default (sequelize: Sequelize) => {
  const Auth = sequelize.define<any>(
    "Auth",
    {
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
    },
    {
      timestamps: true,
      hooks: {
        beforeCreate: async (auth: any) => {
          if (auth.password) {
            const salt = await bcrypt.genSalt(10);
            auth.password = await bcrypt.hash(auth.password, salt);
          }
        },
        beforeUpdate: async (auth: any) => {
          if (auth.changed("password")) {
            const salt = await bcrypt.genSalt(10);
            auth.password = await bcrypt.hash(auth.password, salt);
          }
        },
      },
    }
  );

  (Auth as any).prototype.comparePassword = async function (
    plainPassword: string
  ): Promise<boolean> {
    return bcrypt.compare(plainPassword, this.password);
  };

  return Auth as typeof Auth & { prototype: any };
};
