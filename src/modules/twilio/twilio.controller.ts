import { Body, Controller, OnModuleInit, Post } from '@nestjs/common';
import { TwilioService } from './twilio.service';

@Controller('twilio')
export class TwilioController implements OnModuleInit {
  constructor(private readonly twilioService: TwilioService) {}

  onModuleInit() {
    console.log('TwilioController initialized');
  }

  //   @Get('create')
  //   createRoom() {
  //     return this.twilioService.createRoom();
  //   }
  //
  //   @Get()
  //   fetchRoom() {
  //     return this.twilioService.fetchRoom();
  //   }

  @Post('access-token')
  async generateTwilioAccessToken(
    @Body() identity: string,
    @Body() roomName: string,
  ) {
    return this.twilioService.generateTwilioAccessToken(identity, roomName);
  }
}
