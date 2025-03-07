import { Model, DataTypes, Optional, Sequelize } from "sequelize";

interface UserAttributes {
  id: number;
  name: string;
  email: string;
  mobile_number: string;
  interests: string[];
  likes: string[];
  createdAt?: Date;
  updatedAt?: Date;
}

interface UserCreationAttributes
  extends Optional<UserAttributes, "id" | "likes"> {}

class User
  extends Model<UserAttributes, UserCreationAttributes>
  implements UserAttributes
{
  public id!: number;
  public name!: string;
  public email!: string;
  public mobile_number!: string;
  public interests!: string[];
  public likes!: string[];
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;

  public async addLikedEvent(eventId: string): Promise<boolean> {
    if (!this.likes.includes(eventId)) {
      this.likes.push(eventId);
      await this.save();
      return true;
    }
    return false;
  }
  public async addInterested(interest: string): Promise<boolean> {
    if (!this.interests.includes(interest)) {
      this.interests.push(interest);
      await this.save();
      return true;
    }
    return false;
  }
}

export default (sequelize: Sequelize) => {
  User.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
          isEmail: true,
        },
      },
      mobile_number: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          is: /^[0-9\+\-\s]+$/i,
        },
      },
      interests: {
        type: DataTypes.JSON,
        allowNull: true,
        defaultValue: [],
      },
      likes: {
        type: DataTypes.JSON,
        allowNull: true,
        defaultValue: [],
      },
    },
    {
      tableName: "users",
      timestamps: true,
      sequelize,
    }
  );
  return User;
};
