import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Types } from 'mongoose';

@Schema({ timestamps: true })
export class Comment {
  @Prop({ type: Types.ObjectId, ref: 'User', required: true })
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
   */
  @Prop({ type: [Types.ObjectId], ref: 'Comment' })
  comments?: Types.ObjectId[];
}

export const CommentSchema = SchemaFactory.createForClass(Comment);
