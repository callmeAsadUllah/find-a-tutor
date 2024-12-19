import { UserDocument } from '../modules/users/user.schema';

declare global {
  namespace Express {
    interface Request {
      user?: UserDocument;
    }
  }
}