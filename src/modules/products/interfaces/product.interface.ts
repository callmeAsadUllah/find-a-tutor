import { Types } from 'mongoose';

export interface IProduct {
  userId: Types.ObjectId;
  name: string;
  description?: string;
}
