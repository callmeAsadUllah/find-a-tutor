import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { ISubject } from './interfaces/subject.interface';

export type SubjectDocument = ISubject & Subject & Document;

@Schema({ timestamps: true })
export class Subject {
  @Prop({ type: String })
  title: string;

  @Prop({ type: String })
  description?: string;

  @Prop()
  @Prop({ type: [{ type: Types.ObjectId, ref: 'User' }], required: true })
  users: Types.ObjectId[];
}

export const SubjectSchema = SchemaFactory.createForClass(Subject);
