import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  OnModuleInit,
  Req,
} from '@nestjs/common';
import { RoomsService } from './rooms.service';
import { CreateRoomDto } from './dtos/room.dto';
import { Types } from 'mongoose';
import { Request } from 'express';
import { Role } from 'src/common/enums/role.enum';

@Controller('rooms')
export class RoomsController implements OnModuleInit {
  constructor(private readonly roomsService: RoomsService) {}

  async onModuleInit() {
    console.log('RoomsController initialized');
  }

  @Post()
  async createRoom(
    @Req() request: Request,
    @Body() createRoomDto: CreateRoomDto,
  ) {
    const { role } = request.user;

    if (role !== Role.TUTOR) {
      throw new Error('Only tutors can create rooms');
    }

    try {
      const room = await this.roomsService.createRoom(createRoomDto);

      console.log(room);

      return { roomName: room };
    } catch (error) {
      console.error(error.message);
      throw new Error(error.message);
    }
  }

  @Get()
  async findAllRooms() {
    return await this.roomsService.findAllRooms();
  }

  @Get(':roomId')
  async getOneRoomById(@Param('roomId') roomId: Types.ObjectId) {
    return await this.roomsService.getOneRoomById(roomId);
  }
}
