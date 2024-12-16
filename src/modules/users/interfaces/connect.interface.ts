import { Types } from 'mongoose';
import { Connect } from 'src/common/enums/connect.enum';

export interface IConnect {
  userId: Types.ObjectId;
  connect: Connect;
}
