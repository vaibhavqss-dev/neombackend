"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
class User extends sequelize_1.Model {
    async addLikedEvent(eventId) {
        try {
            if (!eventId) {
                console.error("Invalid event ID provided");
                return false;
            }
            const currentLikes = this.get("likes") || [];
            if (!currentLikes.includes(eventId)) {
                this.set("likes", [...currentLikes, eventId]);
                await this.save();
                return true;
            }
            return false;
        }
        catch (error) {
            console.error("Error adding liked event:", error);
            return false;
        }
    }
    async addInterested(interest) {
        try {
            if (!interest) {
                console.error("Invalid interest provided");
                return false;
            }
            const currentInterests = this.get("interests") || [];
            if (!currentInterests.includes(interest)) {
                this.set("interests", [...currentInterests, interest]);
                await this.save();
                return true;
            }
            return false;
        }
        catch (error) {
            console.error("Error adding interest:", error);
            return false;
        }
    }
    get id() {
        return this.getDataValue("id");
    }
    get name() {
        return this.getDataValue("name");
    }
    get email() {
        return this.getDataValue("email");
    }
    get mobile_number() {
        return this.getDataValue("mobile_number");
    }
    get interests() {
        return this.getDataValue("interests") || [];
    }
    get likes() {
        return this.getDataValue("likes") || [];
    }
}
exports.default = (sequelize) => {
    User.init({
        id: {
            type: sequelize_1.DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        name: {
            type: sequelize_1.DataTypes.STRING,
            allowNull: false,
        },
        email: {
            type: sequelize_1.DataTypes.STRING,
            allowNull: false,
            unique: true,
            validate: {
                isEmail: true,
            },
        },
        mobile_number: {
            type: sequelize_1.DataTypes.STRING,
            allowNull: false,
            validate: {
                is: /^[0-9\+\-\s]+$/i,
            },
        },
        interests: {
            type: sequelize_1.DataTypes.JSON,
            allowNull: true,
            defaultValue: [],
        },
        likes: {
            type: sequelize_1.DataTypes.JSON,
            allowNull: true,
            defaultValue: [],
        },
    }, {
        tableName: "users",
        timestamps: true,
        sequelize,
    });
    return User;
};
