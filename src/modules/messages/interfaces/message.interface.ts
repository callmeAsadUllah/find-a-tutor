import { Types } from 'mongoose';

export interface IMessage {
  userId: Types.ObjectId;
  message: string;
}
