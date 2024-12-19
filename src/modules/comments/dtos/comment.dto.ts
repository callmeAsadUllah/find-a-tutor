import {
  IsNotEmpty,
  IsString,
  IsOptional,
  IsArray,
  IsDate,
  IsMongoId,
} from 'class-validator';
import { Types } from 'mongoose';

export class CreateCommentDto {
  @IsMongoId()
  @IsNotEmpty()
  userId: Types.ObjectId;

  @IsString()
  @IsNotEmpty()
  content: string;

  @IsDate()
  @IsOptional()
  publishedDate?: Date;

  @IsArray()
  @IsOptional()
  comments?: Types.ObjectId[];
}
