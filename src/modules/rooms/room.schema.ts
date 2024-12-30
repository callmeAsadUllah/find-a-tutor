import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { IRoom } from './interfaces/room.interface';

@Schema({ timestamps: true })
export class Room implements IRoom {
  @Prop({ type: String, required: true, unique: true, index: 'text' })
  name: string;
}

export const RoomSchema = SchemaFactory.createForClass(Room);
