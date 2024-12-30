import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { IRoom } from './interfaces/room.interface';
import { Document } from 'mongoose';

export type RoomDocument = IRoom & Room & Document;

@Schema({ timestamps: true })
export class Room implements IRoom {
  @Prop({ type: String, required: true, unique: true, index: 'text' })
  name: string;
}

export const RoomSchema = SchemaFactory.createForClass(Room);
