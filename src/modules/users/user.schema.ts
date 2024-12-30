import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { Gender } from 'src/common/enums/gender.enum';
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
  toJSON: {
    transform: (doc, ret) => {
      if (!ret.gender) {
        delete ret.gender;
      }
      if (!ret.city) {
        delete ret.city;
      }
      if (!ret.plans) {
        delete ret.plans;
      }
      if (!ret.tutors) {
        delete ret.tutors;
      }
      if (!ret.students) {
        delete ret.students;
      }
      return ret;
    },
  },
  toObject: {
    transform: (doc, ret) => {
      if (!ret.gender) {
        delete ret.gender;
      }
      if (!ret.city) {
        delete ret.city;
      }
      if (!ret.plans) {
        delete ret.plans;
      }
      if (!ret.tutors) {
        delete ret.tutors;
      }
      if (!ret.students) {
        delete ret.students;
      }
      return ret;
    },
  },
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
  @Prop({
    type: [String],
    enum: Interest,
    required: true,
    validate: {
      validator: (value: string[]) => {
        return value && value.length > 0;
      },
      message: 'Interests cannot be empty',
    },
  })
  interests: Interest[];

  @Prop({ type: Types.ObjectId, ref: 'Customer', default: undefined })
  customer?: Types.ObjectId;

  @Prop({ type: [Types.ObjectId], ref: 'Subscription', default: undefined })
  subscriptions?: Types.ObjectId[];

  /**
   * Array of ObjectIds referencing the tutors associated with the student
   */
  @Prop({ type: [Types.ObjectId], ref: 'Tutor', default: undefined })
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
   * Number of years of teaching experience
   */
  @Prop({ type: Number, required: true })
  experience: number;

  /**
   * Qualification of the tutor (e.g., MSc in Mathematics)
   */
  @Prop({ type: String, enum: Qualification, required: true })
  qualification: Qualification;

  @Prop({ type: [String], enum: Interest, default: undefined })
  subjects?: Interest[];

  @Prop({ type: [Types.ObjectId], ref: 'Product', default: undefined })
  products?: Types.ObjectId[];

  @Prop({ type: [Types.ObjectId], ref: 'Price', default: undefined })
  prices?: Types.ObjectId[];
  /**
   * Array of ObjectIds referencing the students taught by the tutor
   */
  @Prop({ type: [Types.ObjectId], ref: 'Student', default: undefined })
  students?: Types.ObjectId[];

  /**
   * Array of availability slots (e.g., 'Monday 2-4 PM')
   */
  @Prop({
    type: [String],
    enum: Availability,
    required: true,
    validate: {
      validator: (value: string[]) => {
        return value && value.length > 0;
      },
      message: 'Availability cannot be empty',
    },
  })
  availability: Availability[];

  @Prop({ type: [Types.ObjectId], ref: 'Request', default: undefined })
  requests?: Types.ObjectId[];
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
