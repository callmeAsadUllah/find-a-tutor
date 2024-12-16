import {
  IsString,
  IsOptional,
  IsEmail,
  IsEnum,
  IsNumber,
  IsBoolean,
  IsArray,
  IsMongoId,
} from 'class-validator';
import { Gender } from 'src/common/enums/gender.enum';
import { Types } from 'mongoose';

export class UpdateUserDto {
  @IsOptional()
  @IsString()
  username?: string;

  @IsOptional()
  @IsEmail()
  email?: string;

  @IsOptional()
  @IsString()
  phoneNumber?: string;

  @IsOptional()
  @IsString()
  password?: string;

  @IsOptional()
  @IsEnum(Gender)
  gender?: Gender;

  @IsOptional()
  @IsString()
  refreshToken?: string;

  @IsOptional()
  @IsBoolean()
  isActive?: boolean;

  @IsOptional()
  @IsBoolean()
  isPhoneNumberVerified?: boolean;

  @IsOptional()
  @IsBoolean()
  isEmailVerified?: boolean;
}

export class UpdateStudentDto extends UpdateUserDto {
  @IsOptional()
  @IsString()
  grade?: string;

  @IsOptional()
  @IsArray()
  interests?: string[];
}

export class UpdateTutorDto extends UpdateUserDto {
  @IsOptional()
  @IsNumber()
  rate?: number;

  @IsOptional()
  @IsNumber()
  yearsOfExperience?: number;

  @IsOptional()
  @IsString()
  qualification?: string;

  @IsOptional()
  @IsArray()
  @IsMongoId({ each: true })
  subjects?: Types.ObjectId[];

  @IsOptional()
  @IsArray()
  availability?: string[];

  @IsOptional()
  @IsArray()
  reviews?: string[];
}

export class UpdateAdminDto extends UpdateUserDto {
  @IsOptional()
  @IsString()
  profileImageUrl?: string;

  @IsOptional()
  @IsString()
  address?: string;

  @IsOptional()
  @IsString()
  city?: string;
}
