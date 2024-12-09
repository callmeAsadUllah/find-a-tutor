import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
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

  @Prop({ type: String, required: true, unique: true, index: true })
  phoneNumber: string;

  @Prop({ type: String, required: true })
  password: string;

  @Prop({ type: String, enum: Role })
  role: Role;

  @Prop({ type: String, enum: Gender, required: true })
  gender: Gender;

  @Prop({ type: String })
  refreshToken?: string;

  @Prop({ type: Boolean, default: false })
  isActive?: boolean;

  @Prop({ type: Boolean, default: false })
  isVerified?: boolean;
}

export const UserSchema = SchemaFactory.createForClass(User);
