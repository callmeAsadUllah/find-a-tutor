import { Types } from 'mongoose';
import { IRequest } from '../interfaces/request.interface';
import { IsMongoId, IsNotEmpty } from 'class-validator';

export class CreateRequestDto implements IRequest {
  @IsNotEmpty()
  @IsMongoId()
  userId: Types.ObjectId;
}
