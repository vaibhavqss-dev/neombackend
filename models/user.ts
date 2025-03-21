import { Model, DataTypes, Optional, Sequelize } from "sequelize";

interface UserAttributes {
  id: number;
  name: string;
  email: string;
  mobile_number: string;
  profile_img: string; // Make profile_img optional with ?
  interests: string[];
  likes: string[];
  createdAt?: Date;
  updatedAt?: Date;
  dob?: Date;
}

interface UserCreationAttributes
  extends Optional<UserAttributes, "id" | "likes" | "interests"> {}

class User
  extends Model<UserAttributes, UserCreationAttributes>
  implements UserAttributes
{
  // Remove explicit property declarations that shadow Sequelize attributes
  // Sequelize will automatically generate getters and setters for these

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
  public get id(): number {
    return this.getDataValue("id");
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
      profile_img: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      dob: {
        type: DataTypes.DATE,
        allowNull: true,
        defaultValue: null,
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
