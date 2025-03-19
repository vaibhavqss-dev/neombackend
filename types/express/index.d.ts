import { User } from "../../db/db_connect";

declare global {
  namespace Express {
    interface Request {
      user?: User;
    }
  }
}

export {};
