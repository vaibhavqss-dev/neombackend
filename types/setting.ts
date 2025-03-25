import { Model } from "sequelize";

interface SettingAttributes {
  user_id: number;
  personalandAccount?: boolean;
  operator?: boolean;
  managedata?: boolean;
  password_security?: boolean;
  notification_email?: boolean;
  notification_sms?: boolean;
  notification_personalized?: boolean;
  language?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export class Setting extends Model<SettingAttributes> {
  declare user_id: number;
  declare personalandAccount: boolean;
  declare operator: boolean;
  declare managedata: boolean;
  declare password_security: boolean;
  declare notification_email: boolean;
  declare notification_sms: boolean;
  declare notification_personalized: boolean;
  declare language: string;
  declare createdAt?: Date;
  declare updatedAt?: Date;
}
