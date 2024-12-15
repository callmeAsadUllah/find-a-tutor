import { IsMongoId, IsNotEmpty } from 'class-validator';
import { Types } from 'mongoose';

export class AccountActivationRequestDto {
  @IsNotEmpty()
  @IsMongoId()
  userId: Types.ObjectId;
}

export class RequestDto {
  @IsNotEmpty()
  @IsMongoId()
  requestId: Types.ObjectId;
}
