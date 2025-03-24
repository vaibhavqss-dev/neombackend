"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const bcrypt_1 = __importDefault(require("bcrypt"));
exports.default = (sequelize) => {
    const Auth = sequelize.define("Auth", {
        username: {
            type: sequelize_1.DataTypes.STRING,
            allowNull: false,
            unique: true,
            validate: {
                notEmpty: true,
            },
        },
        password: {
            type: sequelize_1.DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [6, 100],
            },
        },
        fullname: {
            type: sequelize_1.DataTypes.STRING,
            allowNull: true,
            validate: {
                notEmpty: true,
            },
        },
    }, {
        timestamps: true,
        hooks: {
            beforeCreate: async (auth) => {
                if (auth.password) {
                    const salt = await bcrypt_1.default.genSalt(10);
                    auth.password = await bcrypt_1.default.hash(auth.password, salt);
                }
            },
            beforeUpdate: async (auth) => {
                if (auth.changed("password")) {
                    const salt = await bcrypt_1.default.genSalt(10);
                    auth.password = await bcrypt_1.default.hash(auth.password, salt);
                }
            },
        },
    });
    Auth.prototype.comparePassword = async function (plainPassword) {
        return bcrypt_1.default.compare(plainPassword, this.password);
    };
    return Auth;
};
