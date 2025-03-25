"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Auth = void 0;
const sequelize_1 = require("sequelize");
const bcrypt_1 = __importDefault(require("bcrypt"));
class Auth extends sequelize_1.Model {
    async comparePassword(plainPassword) {
        return bcrypt_1.default.compare(plainPassword, this.password);
    }
}
exports.Auth = Auth;
