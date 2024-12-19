import { IsMongoId, IsNotEmpty, IsString } from 'class-validator';
import { IMessage } from '../interfaces/message.interface';
import { Types } from 'mongoose';

export class MessageDto implements IMessage {
  @IsNotEmpty()
  @IsMongoId()
  userId: Types.ObjectId;

  @IsNotEmpty()
  @IsString()
  message: string;
}
