import { Types } from 'mongoose';

export interface IComment {
  userId: Types.ObjectId;
  content: string;
  publishedDate: Date;
  comments?: Types.ObjectId[];
}
