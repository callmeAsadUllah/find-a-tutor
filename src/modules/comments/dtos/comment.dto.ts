import {
  IsNotEmpty,
  IsString,
  IsOptional,
  IsArray,
  IsMongoId,
} from 'class-validator';
import { Types } from 'mongoose';

export class CreateCommentDto {
  @IsNotEmpty()
  @IsMongoId()
  userId: Types.ObjectId;

  @IsNotEmpty()
  @IsString()
  content: string;

  @IsOptional()
  @IsArray()
  comments?: Types.ObjectId[];
}
