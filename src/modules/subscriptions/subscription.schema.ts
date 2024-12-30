import { Document, Types } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ISubscription } from './interfaces/subscription.interface';

export type SubscriptionDocument = ISubscription & Subscription & Document;

@Schema({ timestamps: true })
export class Subscription implements ISubscription {
  @Prop({ type: String, required: true, unique: true })
  customerId: string;

  @Prop({ type: String, required: true, unique: true })
  priceId: string;

  @Prop({ type: Types.ObjectId, ref: 'Student', required: true, unique: true })
  userId: Types.ObjectId;
}

export const SubscriptionSchema = SchemaFactory.createForClass(Subscription);
