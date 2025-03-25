"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
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
    async UnlikeEvent(eventId) {
        try {
            if (!eventId) {
                console.error("Invalid event ID provided");
                return false;
            }
            const currentLikes = this.get("likes") || [];
            if (currentLikes.includes(eventId)) {
                this.set("likes", currentLikes.filter((id) => id !== eventId));
                await this.save();
                return true;
            }
            return false;
        }
        catch (error) {
            console.error("Error removing liked event:", error);
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
    get user_id() {
        return this.getDataValue("user_id");
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
    get profile_img() {
        return this.getDataValue("profile_img");
    }
    get curr_latitute() {
        return this.getDataValue("curr_latitute");
    }
    get curr_longitude() {
        return this.getDataValue("curr_longitude");
    }
}
exports.User = User;
exports.default = (sequelize) => {
    User.init({
        user_id: {
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
        profile_img: {
            type: sequelize_1.DataTypes.STRING,
            allowNull: true,
        },
        dob: {
            type: sequelize_1.DataTypes.DATE,
            allowNull: true,
            defaultValue: null,
        },
        curr_latitute: {
            type: sequelize_1.DataTypes.STRING,
            allowNull: true,
            defaultValue: "77°23'23.5",
        },
        curr_longitude: {
            type: sequelize_1.DataTypes.STRING,
            allowNull: true,
            defaultValue: "28°32'06.6",
        },
    }, {
        tableName: "users",
        timestamps: true,
        sequelize,
    });
    return User;
};
