import { Types } from 'mongoose';

export interface ISubscription {
  customerId: string;
  priceId: string;
  userId: Types.ObjectId;
}
