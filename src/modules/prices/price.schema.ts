import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { Interval } from 'src/common/types/interval.type';
import { IPrice } from './interfaces/price.interface';

export type PriceDocument = IPrice & Price & Document;

@Schema({ timestamps: true })
export class Price implements IPrice {
  @Prop({ type: Types.ObjectId, ref: 'Tutor', required: true, unique: true })
  userId: Types.ObjectId;

  @Prop({ type: Number, required: true })
  amount: number;

  @Prop({ type: String, required: true })
  currency: string;

  @Prop({ type: String, required: true })
  interval: Interval;

  @Prop({ type: String, required: true })
  productId: string;
}

export const PriceSchema = SchemaFactory.createForClass(Price);
