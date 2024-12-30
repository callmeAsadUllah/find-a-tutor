import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { IPayment } from './interface/payment.interface';

export type PaymentDocument = IPayment & Payment & Document;

@Schema({ timestamps: true })
export class Payment implements IPayment {
  @Prop({ type: String, required: true })
  customerId: string;
}
export const PaymentSchema = SchemaFactory.createForClass(Payment);
