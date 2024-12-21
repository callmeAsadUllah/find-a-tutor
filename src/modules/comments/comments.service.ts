import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Comment, CommentDocument } from './comment.schema';
import { CreateCommentDto } from './dtos/comment.dto';

@Injectable()
export class CommentsService {
  constructor(
    @InjectModel(Comment.name)
    private readonly commentModel: Model<CommentDocument>,
  ) {}

  async findAllComments() {
    const comments = await this.commentModel.find().populate('comments').exec();
    return comments;
  }

  async findOneComment(commentId: Types.ObjectId) {
    const comments = await this.commentModel
      .findById(commentId)
      .populate('comments')
      .exec();
    if (!comments) {
      throw new Error(`Comment with ID ${commentId} not found`);
    }
    return comments;
  }

  async createComment(createCommentDto: CreateCommentDto) {
    const comment = new this.commentModel({ ...createCommentDto });
    await comment.save();
    return comment;
  }

  async deleteComment(commentId: Types.ObjectId) {
    const comment = await this.commentModel.findByIdAndDelete(commentId).exec();
    if (!comment) {
      throw new Error(`Comment with ID ${commentId} not found`);
    }
    return comment;
  }
}
