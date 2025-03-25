import { Model, DataTypes, Sequelize, Optional } from "sequelize";
import bcrypt from "bcrypt";

interface IAuthAttributes {
  user_id: number;
  username: string;
  password: string;
  fullname?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

interface IAuthCreationAttributes extends Optional<IAuthAttributes, "user_id"> {}
export class Auth extends Model<IAuthAttributes, IAuthCreationAttributes> {
  declare user_id: number;
  declare username: string;
  declare password: string;
  declare fullname: string;

  declare readonly createdAt: Date;
  declare readonly updatedAt: Date;

  async comparePassword(plainPassword: string): Promise<boolean> {
    return bcrypt.compare(plainPassword, this.password);
  }
}
