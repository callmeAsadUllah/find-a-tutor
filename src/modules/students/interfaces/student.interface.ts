import { Types } from 'mongoose';
import { IUser } from 'src/modules/users/interfaces/user.interface';

export interface IStudent extends IUser {
  enrolledCourses: Types.ObjectId[];
  isActive: boolean;
  isVerified: boolean;
}
