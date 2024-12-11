import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { IUser } from './interfaces/user.interface';
import { Role } from 'src/common/enums/role.enum';
import { Gender } from 'src/common/enums/gender.enum';

export type UserDocument = IUser & User & Document;

@Schema({ timestamps: true })
export class User {
  @Prop({ type: String, required: true, unique: true, index: true })
  username: string;

  @Prop({ type: String })
  firstName?: string;

  @Prop({ type: String })
  lastName?: string;

  @Prop({ type: String, required: true, unique: true, index: true })
  email: string;

  @Prop({ type: String, required: true, unique: true })
  phoneNumber: string;

  @Prop({ type: String, required: true })
  password: string;

  @Prop({ type: String, enum: Gender })
  gender?: Gender;

  @Prop({ type: Number })
  age?: number;

  @Prop({ type: Date })
  dateOfBirth?: Date;

  @Prop({ type: [{ type: Types.ObjectId, ref: 'Subject' }] })
  subjects?: Types.ObjectId[];

  @Prop({ type: String, enum: Role, default: Role.STUDENT })
  role: Role;

  @Prop({ type: String })
  profileImageUrl?: string;

  @Prop({ type: String })
  address?: string;

  @Prop({ type: String })
  city?: string;

  @Prop({ type: Number })
  rate?: number;

  @Prop({ type: Number })
  yearsOfExperience?: number;

  @Prop({ type: String })
  qualification?: string;

  @Prop({ type: [String] })
  availability?: string[];

  @Prop({ type: [String] })
  reviews?: string[];

  @Prop({ type: String })
  grade?: string;

  @Prop({ type: [String] })
  interests?: string[];

  @Prop({ type: String })
  refreshToken?: string;

  @Prop({ type: Boolean, default: false })
  isActive?: boolean;

  @Prop({ type: Boolean, default: false })
  isVerified?: boolean;
}

export const UserSchema = SchemaFactory.createForClass(User);
