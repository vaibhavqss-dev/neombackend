import { User } from "../../db/db_connection";

declare global {
  namespace Express {
    interface Request {
      user?: User;
    }
  }
}

export {};
