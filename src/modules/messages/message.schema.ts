import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { IMessage } from './interfaces/message.interface';

export type MessageDocument = Message & Document;

@Schema({
  timestamps: true,
})
export class Message implements IMessage {
  @Prop({ type: Types.ObjectId, ref: 'User', required: true })
  userId: Types.ObjectId;

  @Prop({ type: String, required: true })
  message: string;
}

export const MessageSchema = SchemaFactory.createForClass(Message);
