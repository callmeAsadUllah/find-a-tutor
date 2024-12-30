import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { IRequest } from './interfaces/request.interface';

export type RequestDocument = IRequest & Request & Document;

@Schema({ timestamps: true })
export class Request implements IRequest {
  @Prop({ type: Types.ObjectId, ref: 'Student', required: true, unique: true })
  userId: Types.ObjectId;
}

export const RequestSchema = SchemaFactory.createForClass(Request);
