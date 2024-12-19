import {
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsPhoneNumber,
  IsString,
} from 'class-validator';
import { Role } from 'src/common/enums/role.enum';

export class RegisterDto {
  @IsNotEmpty()
  @IsString()
  username: string;

  @IsNotEmpty()
  @IsString()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsString()
  @IsPhoneNumber('PK')
  phoneNumber: string;

  @IsNotEmpty()
  @IsString()
  password: string;

  @IsNotEmpty()
  @IsString()
  @IsEnum(Role)
  role: Role;
}

export class LoginDto {
  @IsNotEmpty()
  @IsString()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsString()
  password: string;
}

export class PhoneNumberDto {
  @IsNotEmpty()
  @IsString()
  @IsPhoneNumber('PK')
  phoneNumber: string;

  @IsNotEmpty()
  @IsString()
  @IsEnum(Role)
  role: Role;
}

export class VerifyPhoneNumberCodeDto {
  @IsNotEmpty()
  @IsString()
  @IsPhoneNumber('PK')
  phoneNumber: string;

  @IsNotEmpty()
  @IsString()
  code: string;

  @IsNotEmpty()
  @IsString()
  @IsEnum(Role)
  role: Role;
}

export class EmailDto {
  @IsNotEmpty()
  @IsString()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsString()
  @IsEnum(Role)
  role: Role;
}

export class VerifyEmailCodeDto {
  @IsNotEmpty()
  @IsString()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsString()
  code: string;

  @IsNotEmpty()
  @IsString()
  @IsEnum(Role)
  role: Role;
}
