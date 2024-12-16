// import { Types } from 'mongoose';
import { Availability } from 'src/common/enums/availability.enum';
import { City } from 'src/common/enums/city.enum';
import { Gender } from 'src/common/enums/gender.enum';
import { Grade } from 'src/common/enums/grade.enum';
import { Interest } from 'src/common/enums/interest.enum';
import { Qualification } from 'src/common/enums/qualification.enum';
import { RateType } from 'src/common/enums/rate-type.enum';
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
  role: Role;
  city?: City;
  // Tutor-specific fields
  rateType?: RateType;
  rates?: number;
  experience?: number;
  qualification?: Qualification;
  availability?: Availability[];
  // Student-specific fields
  grade?: Grade;
  interests?: Interest[];
  // auth-specific fields
  refreshToken?: string;
  isActive: boolean;
  isPhoneNumberVerified: boolean;
  isEmailVerified: boolean;
}
