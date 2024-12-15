import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Types, Document } from 'mongoose';
import { IAccountActivationRequest } from './interfaces/admin.interface';

export type AccountActivationRequestDocument = IAccountActivationRequest &
  AccountActivationRequest &
  Document;

@Schema({ timestamps: true })
export class AccountActivationRequest {
  @Prop({ type: Types.ObjectId, ref: 'User', required: true })
  userId: Types.ObjectId;

  @Prop({ type: Boolean, default: false })
  isActive: boolean;
}

export const AccountActivationRequestSchema = SchemaFactory.createForClass(
  AccountActivationRequest,
);
