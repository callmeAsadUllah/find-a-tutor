import { Types } from 'mongoose';

export interface ISubject {
  title: string;
  description?: string;
  price: number;
  users: Types.ObjectId[];
}
