import { Types } from 'mongoose';

export interface IComment {
  content: string;
  user: Types.ObjectId;
}
