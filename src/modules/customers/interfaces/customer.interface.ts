import { Types } from 'mongoose';

export interface ICustomer {
  name: string;
  email: string;
  paymentMethod?: string;
  userId: Types.ObjectId;
}
