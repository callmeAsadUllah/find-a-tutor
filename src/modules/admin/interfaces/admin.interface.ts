import { Types } from 'mongoose';

export interface IAccountActivationRequest {
  userId: Types.ObjectId;
}
