import { Controller, Get, OnModuleInit, Req } from '@nestjs/common';
import { Request } from 'express';

@Controller('me')
export class MeController implements OnModuleInit {
  async onModuleInit() {
    console.log('MeController initialized');
  }

  @Get()
  async me(@Req() request: Request) {
    try {
      const { user } = request;
      return user;
    } catch (error) {
      console.error(error.message);
      throw new Error(error.message);
    }
  }
}
