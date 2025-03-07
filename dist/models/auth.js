"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const bcrypt_1 = __importDefault(require("bcrypt"));
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
    }, {
        timestamps: true,
        hooks: {
            beforeCreate: (auth) => __awaiter(void 0, void 0, void 0, function* () {
                if (auth.password) {
                    const salt = yield bcrypt_1.default.genSalt(10);
                    auth.password = yield bcrypt_1.default.hash(auth.password, salt);
                }
            }),
            beforeUpdate: (auth) => __awaiter(void 0, void 0, void 0, function* () {
                if (auth.changed("password")) {
                    const salt = yield bcrypt_1.default.genSalt(10);
                    auth.password = yield bcrypt_1.default.hash(auth.password, salt);
                }
            }),
        },
    });
    Auth.prototype.comparePassword = function (plainPassword) {
        return __awaiter(this, void 0, void 0, function* () {
            return bcrypt_1.default.compare(plainPassword, this.password);
        });
    };
    return Auth;
};
