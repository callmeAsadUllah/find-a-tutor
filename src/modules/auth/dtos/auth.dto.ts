import {
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsNumberString,
  IsPhoneNumber,
  IsString,
} from 'class-validator';
import { Role } from 'src/common/enums/role.enum';

export class RegisterDto {
  @IsNotEmpty()
  @IsString()
  username: string;

  @IsNotEmpty()
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
  @IsEnum(Role)
  role: Role;
}

export class LoginDto {
  @IsNotEmpty()
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
  @IsEnum(Role)
  role: Role;
}

export class VerifyPhoneNumberCodeDto {
  @IsNotEmpty()
  @IsString()
  @IsPhoneNumber('PK')
  phoneNumber: string;

  @IsNotEmpty()
  @IsNumberString()
  code: string;

  @IsNotEmpty()
  @IsEnum(Role)
  role: Role;
}
