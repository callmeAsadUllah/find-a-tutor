import { Injectable, OnModuleInit } from '@nestjs/common';
import { CreateRoomDto } from './dtos/room.dto';
import { Model, Types } from 'mongoose';
import { TwilioService } from '../twilio/twilio.service';
import { InjectModel } from '@nestjs/mongoose';
import { Room, RoomDocument } from './room.schema';

@Injectable()
export class RoomsService implements OnModuleInit {
  constructor(
    @InjectModel(Room.name) private readonly roomModel: Model<RoomDocument>,
    private readonly twilioService: TwilioService,
  ) {}

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

      return { data: room };
    } catch (error) {
      console.error(error.message);
      throw new Error(error.message);
    }
  }

  async findAllRooms() {
    try {
      const rooms = await this.roomModel.find().exec();

      console.log(`${rooms}`);

      return {
        data: rooms,
      };
    } catch (error) {
      console.error(error.message);
      throw new Error(error.message);
    }
  }

  async findOneRoomByName(name?: string) {
    try {
      const room = await this.roomModel.findOne({ name: name }).exec();

      console.log(`${room}`);

      return {
        roomName: room.name,
        data: room,
      };
    } catch (error) {
      console.error(error.message);
      throw new Error(error.message);
    }
  }

  async getOneRoomById(roomId: Types.ObjectId) {
    try {
      const room = await this.roomModel.findById(roomId).exec();

      console.log(`${room}`);

      return {
        roomId: room.id,
        data: room,
      };
    } catch (error) {
      console.log(error.message);
      throw new Error(error.message);
    }
  }
}
