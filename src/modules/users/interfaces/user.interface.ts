import { Types } from 'mongoose';
import { Gender } from 'src/common/enums/gender.enum';
import { Role } from 'src/common/enums/role.enum';

export interface IUser {
  // Basic Information
  username: string;
  firstName?: string;
  lastName?: string;
  email: string;
  phoneNumber: string;
  password: string;
  gender?: Gender;
  age?: number;
  dateOfBirth?: Date;
  subjects?: Types.ObjectId[];
  // api rbac
  role: Role;
  // contact information
  profileImageUrl?: string;
  address?: string;
  city?: string;
  // Tutor-specific fields
  rate?: number;
  yearsOfExperience?: number;
  qualification?: string;
  availability?: string[];
  reviews?: string[];
  // Student-specific fields
  grade?: string;
  interests?: string[];
  // auth-specific fields
  refreshToken?: string;
  isActive: boolean;
  isVerified: boolean;
}
