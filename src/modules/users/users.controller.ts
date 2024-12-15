import {
  Body,
  Controller,
  forwardRef,
  Get,
  Inject,
  OnModuleInit,
  Param,
  Post,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { IResponse } from 'src/common/interfaces/response.interface';
import { IUser } from './interfaces/user.interface';
import { TwilioService } from '../twilio/twilio.service';
import { Types } from 'mongoose';
import {
  PhoneNumberDto,
  VerifyPhoneNumberCodeDto,
} from '../auth/dtos/auth.dto';

@Controller('users')
export class UsersController implements OnModuleInit {
  constructor(
    @Inject(forwardRef(() => TwilioService))
    private readonly twilioService: TwilioService,
    private readonly usersService: UsersService,
  ) {}

  onModuleInit() {
    console.log('UsersController initialized');
  }

  @Get(':userId')
  async getUserById(
    @Param('userId') userId: Types.ObjectId,
  ): Promise<Partial<IResponse<IUser>>> {
    return await this.usersService.getUserById(userId);
  }

  @Post('send-code')
  async sendPhoneNumberVerificationCode(
    @Body() phoneNumberDto: PhoneNumberDto,
  ): Promise<Partial<IResponse<IUser>>> {
    console.log(phoneNumberDto);
    return await this.twilioService.sendPhoneNumberVerificationCode(
      phoneNumberDto,
    );
  }

  @Post('verify-code')
  async verifyPhoneNumberCode(
    @Body() verifyPhoneNumberCodeDto: VerifyPhoneNumberCodeDto,
  ): Promise<boolean> {
    return await this.twilioService.verifyPhoneNumberCode(
      verifyPhoneNumberCodeDto,
    );
  }
}
