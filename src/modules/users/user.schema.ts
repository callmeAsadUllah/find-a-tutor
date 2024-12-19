import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { Gender } from 'src/common/enums/gender.enum';
import { RateType } from 'src/common/enums/rate-type.enum';
import { Qualification } from 'src/common/enums/qualification.enum';
import { City } from 'src/common/enums/city.enum';
import { Grade } from 'src/common/enums/grade.enum';
import { Interest } from 'src/common/enums/interest.enum';
import { Availability } from 'src/common/enums/availability.enum';
import { Role } from 'src/common/enums/role.enum';

// Type for User Document
export type UserDocument = Tutor & Student & User & Document;

//
// ==============================
// BASE USER SCHEMA
// ==============================
//
@Schema({
  timestamps: true,
  discriminatorKey: 'type',
  // toJSON: {
  //   transform: (doc, ret) => {
  //     if (!ret.gender) {
  //       delete ret.gender;
  //     }
  //     if (!ret.city) {
  //       delete ret.city;
  //     }
  //     // if (!ret.rateType) {
  //     //   delete ret.rateType;
  //     // }
  //     // if (!ret.rates) {
  //     //   delete ret.rates;
  //     // }
  //     // if (!ret.experience) {
  //     //   delete ret.experience;
  //     // }
  //     // if (!ret.qualification) {
  //     //   delete ret.qualification;
  //     // }
  //     // if (!ret.availability) {
  //     //   delete ret.availability;
  //     // }
  //     if (!ret.grade) {
  //       delete ret.grade;
  //     }
  //     if (!ret.interest) {
  //       delete ret.interest;
  //     }
  //     if (!ret.tutors) {
  //       delete ret.tutors;
  //     }
  //     if (!ret.students) {
  //       delete ret.students;
  //     }
  //     return ret;
  //   },
  // },
  // toObject: {
  //   transform: (doc, ret) => {
  //     if (!ret.gender) {
  //       delete ret.gender;
  //     }
  //     if (!ret.city) {
  //       delete ret.city;
  //     }
  //     // if (!ret.rateType) {
  //     //   delete ret.rateType;
  //     // }
  //     // if (!ret.rates) {
  //     //   delete ret.rates;
  //     // }
  //     // if (!ret.experience) {
  //     //   delete ret.experience;
  //     // }
  //     // if (!ret.qualification) {
  //     //   delete ret.qualification;
  //     // }
  //     // if (!ret.availability) {
  //     //   delete ret.availability;
  //     // }
  //     if (!ret.grade) {
  //       delete ret.grade;
  //     }
  //     if (!ret.interest) {
  //       delete ret.interest;
  //     }
  //     if (!ret.tutors) {
  //       delete ret.tutors;
  //     }
  //     if (!ret.students) {
  //       delete ret.students;
  //     }
  //     return ret;
  //   },
  // },
})
export class User {
  /**
   * Unique username for the user
   */
  @Prop({ type: String, required: true, unique: true, index: true })
  username: string;

  /**
   * FIrst name for the user
   */
  @Prop({ type: String })
  firstName?: string;

  /**
   * Last name for the user
   */
  @Prop({ type: String })
  lastName?: string;

  /**
   * Unique email for the user
   */
  @Prop({ type: String, required: true, unique: true, index: true })
  email: string;

  /**
   * Unique phone number for the user
   */
  @Prop({ type: String, required: true, unique: true })
  phoneNumber: string;

  /**
   * Encrypted password for authentication
   */
  @Prop({ type: String, required: true })
  password: string;

  /**
   * Gender of the user (optional)
   */
  @Prop({ type: String, enum: Gender })
  gender?: Gender;

  /**
   * City of the user (optional)
   */
  @Prop({ type: String, enum: City })
  city?: City;

  /**
   * Role of the user
   */
  @Prop({ type: String, enum: Role })
  role: Role;

  /**
   * Refresh token for session management
   */
  @Prop({ type: String })
  refreshToken?: string;

  /**
   * Indicates whether the account is active
   */
  @Prop({ type: Boolean, default: false })
  isActive: boolean;

  /**
   * Indicates whether the phone number is verified
   */
  @Prop({ type: Boolean, default: false })
  isPhoneNumberVerified: boolean;

  /**
   * Indicates whether the email is verified
   */
  @Prop({ type: Boolean, default: false })
  isEmailVerified: boolean;
}

// Create schema for the base User class
export const UserSchema = SchemaFactory.createForClass(User);

//
// ==============================
// STUDENT SCHEMA
// ==============================
//
@Schema()
export class Student extends User {
  /**
   * Grade of the student (e.g., Grade 10, O-Level)
   */
  @Prop({ type: String, enum: Grade, required: true })
  grade: Grade;

  /**
   * List of student interests (e.g., Mathematics, Sports)
   */
  @Prop({ type: [String], enum: Interest, required: true })
  interests: Interest[];

  /**
   * Array of ObjectIds referencing the tutors associated with the student
   */
  @Prop({ type: [Types.ObjectId], ref: 'Tutor' })
  tutors?: Types.ObjectId[];
}

// Create schema for the Student class
export const StudentSchema = SchemaFactory.createForClass(Student);

//
// ==============================
// TUTOR SCHEMA
// ==============================
//
@Schema()
export class Tutor extends User {
  /**
   * Rates charged by the tutor (e.g., 1000 PKR per hour)
   */
  @Prop({ type: Number, required: true })
  rates: number;

  /**
   * Number of years of teaching experience
   */
  @Prop({ type: Number, required: true })
  experience: number;

  /**
   * Qualification of the tutor (e.g., MSc in Mathematics)
   */
  @Prop({ type: String, enum: Qualification, required: true })
  qualification: Qualification;

  @Prop({ type: [String], enum: Interest })
  subjects?: Interest[];

  /**
   * Rate type (Hourly, Monthly, etc.)
   * Refers to the RateType enum
   */
  @Prop({ type: String, enum: RateType, default: RateType.MONTHLY })
  rateType: RateType;

  /**
   * Array of ObjectIds referencing the students taught by the tutor
   */
  @Prop({ type: [Types.ObjectId], ref: 'Student' })
  students?: Types.ObjectId[];

  /**
   * Array of availability slots (e.g., 'Monday 2-4 PM')
   */
  @Prop({ type: [String], enum: Availability, required: true })
  availability: Availability[];
}

// Create schema for the Tutor class
export const TutorSchema = SchemaFactory.createForClass(Tutor);

//
// ==============================
// ADMIN SCHEMA
// ==============================
//
@Schema()
export class Admin extends User {
  /**
   * Array of ObjectIds referencing account activation requests handled by the admin
   */
  @Prop({ type: [Types.ObjectId], ref: 'AccountActivationRequest' })
  requests?: Types.ObjectId[];

  /**
   * Array of ObjectIds referencing user accounts managed by the admin
   */
  @Prop({ type: [Types.ObjectId], ref: 'User' })
  accounts?: Types.ObjectId[];
}

// Create schema for the Admin class
export const AdminSchema = SchemaFactory.createForClass(Admin);
