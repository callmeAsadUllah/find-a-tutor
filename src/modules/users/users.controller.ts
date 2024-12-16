import {
  Body,
  Controller,
  forwardRef,
  Get,
  Inject,
  OnModuleInit,
  Param,
  Post,
  Req,
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
import { ConnectDto } from './dtos/connect.dto';
import { Role } from 'src/common/enums/role.enum';
import { Roles } from 'src/common/decorators/role.decorator';
import { Request } from 'express';

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

  @Post('connect')
  @Roles(Role.STUDENT)
  connectUser(@Body() connectDto: ConnectDto, @Req() request: Request) {
    const { firstName, lastName, gender, city, interests, grade } =
      request.user;
    return this.usersService.connectUser(
      connectDto,
      firstName,
      lastName,
      gender,
      city,
      interests,
      grade,
    );
  }
}
