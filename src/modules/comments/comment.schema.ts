import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { IComment } from './interfaces/comment.interface';

export type CommentDocument = IComment & Comment & Document;

@Schema({ timestamps: true })
export class Comment {
  @Prop({ type: Types.ObjectId, ref: 'User', required: true, index: true })
  userId: Types.ObjectId;

  @Prop({
    type: String,
    required: true,
  })
  content: string;

  @Prop({
    type: Date,
    default: Date.now,
  })
  publishedDate: Date;

  /**
   * comment in comment
   * will be implemented. it requires time.
   */
  @Prop({ type: [Types.ObjectId], ref: 'Comment' })
  comments?: Types.ObjectId[];
}

export const CommentSchema = SchemaFactory.createForClass(Comment);
