import { Controller, Get, Post, Param, Body, Delete } from '@nestjs/common';
import { CommentsService } from './comments.service';
import { CreateCommentDto } from './dtos/comment.dto';
import { Types } from 'mongoose';

@Controller('comments')
export class CommentsController {
  constructor(private readonly commentsService: CommentsService) {}

  @Get()
  async findAllComments() {
    return await this.commentsService.findAllComments();
  }

  @Get(':commentId')
  async findOneComment(@Param('commentId') commentId: Types.ObjectId) {
    return await this.commentsService.findOneComment(commentId);
  }

  @Post()
  async createComment(@Body() createCommentDto: CreateCommentDto) {
    return await this.commentsService.createComment(createCommentDto);
  }

  @Delete(':commentId')
  async deleteComment(@Param('commentId') commentId: Types.ObjectId) {
    return await this.commentsService.deleteComment(commentId);
  }
}
