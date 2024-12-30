import { Injectable, OnModuleInit } from '@nestjs/common';
import { CreateRoomDto } from './dtos/room.dto';
import { Types } from 'mongoose';
import { TwilioService } from '../twilio/twilio.service';

@Injectable()
export class RoomsService implements OnModuleInit {
  constructor(private readonly twilioService: TwilioService) {}

  async onModuleInit() {
    console.log('RoomsService initialized');
  }

  async createRoom(createRoomDto: CreateRoomDto) {
    try {
      const client = await this.twilioService.getTwilioClient();

      const room = await client.video.v1.rooms.create({
        uniqueName: createRoomDto.name,
        type: 'peer-to-peer',
        maxParticipants: 2,
      });

      console.log(room);

      return room;
    } catch (error) {
      console.log(error.message);
      throw new Error('Failed to create room');
    }
  }

  async findAllRooms() {
    return `This action returns all rooms`;
  }

  async getOneRoomById(roomId: Types.ObjectId) {
    return `This action returns a #${roomId} room`;
  }
}
