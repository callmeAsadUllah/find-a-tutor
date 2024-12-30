import { Document, Types } from 'mongoose';
import { ICustomer } from './interfaces/customer.interface';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

export type CustomerDocument = ICustomer & Customer & Document;

@Schema({ timestamps: true })
export class Customer implements ICustomer {
  @Prop({ type: String, required: true })
  name: string;

  @Prop({ type: String, required: true, unique: true })
  email: string;

  @Prop({ type: String, default: 'pm_card_visa' })
  paymentMethod?: string;

  @Prop({ type: Types.ObjectId, ref: 'Student', required: true, unique: true })
  userId: Types.ObjectId;
}

export const CustomerSchema = SchemaFactory.createForClass(Customer);
