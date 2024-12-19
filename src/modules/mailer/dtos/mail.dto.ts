import {
  IsArray,
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';
import { Grade } from 'src/common/enums/grade.enum';
import { Interest } from 'src/common/enums/interest.enum';
import { City } from 'src/common/enums/city.enum';
import { Gender } from 'src/common/enums/gender.enum';

export class MailDto {
  @IsNotEmpty()
  @IsEmail()
  to: string;

  @IsOptional()
  @IsString()
  firstName?: string;

  @IsOptional()
  @IsString()
  lastName?: string;

  @IsOptional()
  @IsEnum(Grade)
  grade?: Grade;

  @IsOptional()
  @IsEnum(Interest, { each: true })
  @IsArray({ each: true })
  interests?: Interest[];

  @IsOptional()
  @IsEnum(City)
  city?: City;

  @IsOptional()
  @IsEnum(Gender)
  gender?: Gender;
}
