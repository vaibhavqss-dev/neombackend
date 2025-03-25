import { Model, DataTypes, Optional, Sequelize } from "sequelize";

interface UserAttributes {
  user_id: number;
  name: string;
  email: string;
  mobile_number: string;
  profile_img: string;
  interests: string[];
  likes: string[];
  createdAt?: Date;
  updatedAt?: Date;
  dob?: Date;
  curr_latitute: string;
  curr_longitude: string;
}

interface UserCreationAttributes extends Optional<UserAttributes, "user_id"> {}

export class User
  extends Model<UserAttributes, UserCreationAttributes>
  implements UserAttributes
{
  public async addLikedEvent(eventId: string): Promise<boolean> {
    try {
      if (!eventId) {
        console.error("Invalid event ID provided");
        return false;
      }
      const currentLikes = (this.get("likes") as string[] | null) || [];
      if (!currentLikes.includes(eventId)) {
        this.set("likes", [...currentLikes, eventId]);
        await this.save();
        return true;
      }
      return false;
    } catch (error) {
      console.error("Error adding liked event:", error);
      return false;
    }
  }

  public async UnlikeEvent(eventId: string): Promise<boolean> {
    try {
      if (!eventId) {
        console.error("Invalid event ID provided");
        return false;
      }
      const currentLikes = (this.get("likes") as string[] | null) || [];
      if (currentLikes.includes(eventId)) {
        this.set(
          "likes",
          currentLikes.filter((id) => id !== eventId)
        );
        await this.save();
        return true;
      }
      return false;
    } catch (error) {
      console.error("Error removing liked event:", error);
      return false;
    }
  }

  public async addInterested(interest: string): Promise<boolean> {
    try {
      if (!interest) {
        console.error("Invalid interest provided");
        return false;
      }
      const currentInterests = (this.get("interests") as string[] | null) || [];
      if (!currentInterests.includes(interest)) {
        this.set("interests", [...currentInterests, interest]);
        await this.save();
        return true;
      }
      return false;
    } catch (error) {
      console.error("Error adding interest:", error);
      return false;
    }
  }

  // Type assertions for Sequelize-generated getters
  public get user_id(): number {
    return this.getDataValue("user_id");
  }

  public get name(): string {
    return this.getDataValue("name");
  }

  public get email(): string {
    return this.getDataValue("email");
  }

  public get mobile_number(): string {
    return this.getDataValue("mobile_number");
  }

  public get interests(): string[] {
    return this.getDataValue("interests") || [];
  }

  public get likes(): string[] {
    return this.getDataValue("likes") || [];
  }

  public get profile_img(): string {
    return this.getDataValue("profile_img");
  }

  public get curr_latitute(): string {
    return this.getDataValue("curr_latitute");
  }

  public get curr_longitude(): string {
    return this.getDataValue("curr_longitude");
  }

  // public get createdAt(): Date {
  //   return this.getDataValue("createdAt");
  // }
  // public get updatedAt(): Date {
  //   return this.getDataValue("updatedAt");
  // }
}

export default (sequelize: Sequelize) => {
  User.init(
    {
      user_id: {
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
      profile_img: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      dob: {
        type: DataTypes.DATE,
        allowNull: true,
        defaultValue: null,
      },
      curr_latitute: {
        type: DataTypes.STRING,
        allowNull: true,
        defaultValue: "77°23'23.5",
      },
      curr_longitude: {
        type: DataTypes.STRING,
        allowNull: true,
        defaultValue: "28°32'06.6",
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
