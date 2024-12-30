import { IsNotEmpty, IsString } from 'class-validator';
import { IRoom } from '../interfaces/room.interface';

export class CreateRoomDto implements IRoom {
  @IsNotEmpty()
  @IsString()
  name: string;
}
