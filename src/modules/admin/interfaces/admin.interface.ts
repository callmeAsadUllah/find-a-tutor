import { IUser } from 'src/modules/users/interfaces/user.interface';

export interface IAdmin extends IUser {
  permissions: string[];
}
