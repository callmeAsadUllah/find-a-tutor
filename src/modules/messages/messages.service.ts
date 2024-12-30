import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Message, MessageDocument } from './message.schema';
import { Model } from 'mongoose';

@Injectable()
export class ChatService {
  constructor(
    @InjectModel(Message.name)
    private readonly messageModel: Model<MessageDocument>,
  ) {}

  async saveMessage(data: {
    roomId: string;
    senderId: string;
    receiverId: string;
    message: string;
  }) {
    const newMessage = new this.messageModel({
      data,
    });

    await newMessage.save();

    return {
      data: newMessage,
    };
  }

  async getMessages(roomId: string) {
    return await this.messageModel.find({ roomId }).exec();
  }
}
