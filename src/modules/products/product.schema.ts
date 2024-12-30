import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { IProduct } from './interfaces/product.interface';

export type ProductDocument = IProduct & Product & Document;

@Schema({ timestamps: true })
export class Product implements IProduct {
  @Prop({ type: Types.ObjectId, ref: 'Tutor', required: true, unique: true })
  userId: Types.ObjectId;

  @Prop({ type: String, required: true })
  name: string;

  @Prop({ type: String })
  description?: string;
}

export const ProductSchema = SchemaFactory.createForClass(Product);
