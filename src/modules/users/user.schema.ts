import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { IUser } from './interfaces/user.interface';
import { Role } from 'src/common/enums/role.enum';
import { Gender } from 'src/common/enums/gender.enum';

export type UserDocument = IUser & User & Document;

// Base User Schema
@Schema({ timestamps: true })
export class User {
  @Prop({ type: String, required: true, unique: true, index: true })
  username: string;

  @Prop({ type: String, required: true, unique: true, index: true })
  email: string;

  @Prop({ type: String, required: true, unique: true })
  phoneNumber: string;

  @Prop({ type: String, required: true })
  password: string;

  @Prop({ type: String, enum: Gender })
  gender?: Gender;

  @Prop({ type: String })
  profileImageUrl?: string;

  @Prop({ type: String, enum: Role, required: true })
  role: Role;

  @Prop({ type: String })
  refreshToken?: string;

  @Prop({ type: Boolean, default: false })
  isActive: boolean;

  @Prop({ type: Boolean, default: false })
  isPhoneNumberVerified: boolean;

  @Prop({ type: Boolean, default: false })
  isEmailVerified: boolean;
}

export const UserSchema = SchemaFactory.createForClass(User);

// Student Schema
@Schema()
export class Student extends User {
  @Prop({ type: String })
  grade?: string;

  @Prop({ type: [String] })
  interests?: string[];
}

export const StudentSchema = SchemaFactory.createForClass(Student);

// Tutor Schema
@Schema()
export class Tutor extends User {
  @Prop({ type: Number })
  rate?: number;

  @Prop({ type: Number })
  yearsOfExperience?: number;

  @Prop({ type: String })
  qualification?: string;

  @Prop({ type: [Types.ObjectId], ref: 'Subject' })
  subjects?: Types.ObjectId[];

  @Prop({ type: [String] })
  availability?: string[];

  @Prop({ type: [String] })
  reviews?: string[];
}

export const TutorSchema = SchemaFactory.createForClass(Tutor);

// Admin Schema
@Schema()
export class Admin extends User {
  @Prop({ type: [Types.ObjectId], ref: 'AccountActivationRequest' })
  requests?: Types.ObjectId[];

  @Prop({ type: String })
  address?: string;

  @Prop({ type: String })
  city?: string;
}

export const AdminSchema = SchemaFactory.createForClass(Admin);
