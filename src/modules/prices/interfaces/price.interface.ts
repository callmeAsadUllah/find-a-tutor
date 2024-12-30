import { Types } from 'mongoose';
import { Interval } from 'src/common/types/interval.type';

export interface IPrice {
  userId: Types.ObjectId;
  amount: number;
  currency: string;
  interval: Interval;
  productId: string;
}
