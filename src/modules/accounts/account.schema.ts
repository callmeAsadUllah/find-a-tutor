import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { IAccount } from './interfaces/account.interface';

export type AccountDocument = IAccount & Account & Document;

@Schema({ timestamps: true, discriminatorKey: 'role' })
export class Account {
  @Prop({ type: Types.ObjectId, ref: 'User', required: true })
  userId: Types.ObjectId;
}

export const AccountSchema = SchemaFactory.createForClass(Account);
