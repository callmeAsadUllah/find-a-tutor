import { IsMongoId, IsNotEmpty, IsString } from 'class-validator';
import { ISubscription } from '../interfaces/subscription.interface';
import { Types } from 'mongoose';

export class CreateSubscriptionDto implements ISubscription {
  @IsNotEmpty()
  @IsString()
  customerId: string;

  @IsNotEmpty()
  @IsString()
  priceId: string;

  @IsNotEmpty()
  @IsMongoId()
  userId: Types.ObjectId;
}
