import { Module } from '@nestjs/common';
import { PusherController } from './pusher.controller';
import { PusherService } from './pusher.service';

@Module({
  imports: [],
  providers: [PusherService],
  controllers: [PusherController],
  exports: [],
})
export class PusherModule {}
