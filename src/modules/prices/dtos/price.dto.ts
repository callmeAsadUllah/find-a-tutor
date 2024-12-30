import { IsMongoId, IsNotEmpty, IsPositive, IsString } from 'class-validator';
import { Types } from 'mongoose';
import { Interval } from 'src/common/types/interval.type';
import { IPrice } from '../interfaces/price.interface';

export class CreatePriceDto implements IPrice {
  @IsNotEmpty()
  @IsMongoId()
  userId: Types.ObjectId;

  @IsNotEmpty()
  @IsPositive()
  amount: number;

  @IsNotEmpty()
  @IsString()
  currency: string;

  @IsNotEmpty()
  @IsString()
  interval: Interval;

  @IsNotEmpty()
  @IsString()
  productId: string;
}
