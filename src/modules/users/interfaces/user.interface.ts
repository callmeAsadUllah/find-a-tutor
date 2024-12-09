import { Gender } from 'src/common/enums/gender.enum';
import { Role } from 'src/common/enums/role.enum';

export interface IUser {
  username: string;
  firstName?: string;
  lastName?: string;
  email: string;
  phoneNumber: string;
  password: string;
  role: Role;
  gender: Gender;
  refreshToken?: string;
  isActive: boolean;
  isVerified: boolean;
}
