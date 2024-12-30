import { Controller, Get, OnModuleInit, Req } from '@nestjs/common';
import { TwilioService } from './twilio.service';
import { Role } from 'src/common/enums/role.enum';
import { Request } from 'express';

@Controller('twilio')
export class TwilioController implements OnModuleInit {
  constructor(private readonly twilioService: TwilioService) {}

  async onModuleInit() {
    console.log('TwilioController initialized');
  }

  @Get('access-token')
  async generateTwilioAccessToken(@Req() request: Request) {
    const { role } = request.user;

    if (role !== Role.TUTOR) {
      throw new Error('Only tutors can create prices');
    }

    try {
      const { email } = request.user;

      console.log(`email: ${email}`);

      const identity = email;

      const token =
        await this.twilioService.generateTwilioAccessToken(identity);

      return token;
    } catch (error) {
      console.error(error.message);
      throw new Error(error.message);
    }
  }
}
