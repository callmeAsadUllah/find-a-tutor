import {
  forwardRef,
  Inject,
  Injectable,
  NotFoundException,
  OnModuleInit,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as Twilio from 'twilio';

import { AuthService } from '../auth/auth.service';
import { UsersService } from '../users/users.service';
import {
  PhoneNumberDto,
  VerifyPhoneNumberCodeDto,
} from '../auth/dtos/auth.dto';

@Injectable()
export class TwilioService implements OnModuleInit {
  private readonly verificationStore: Map<string, string>;

  constructor(
    @Inject(forwardRef(() => AuthService))
    private readonly authService: AuthService,
    @Inject(forwardRef(() => UsersService))
    private readonly userService: UsersService,
    private readonly configService: ConfigService,
  ) {
    this.verificationStore = new Map<string, string>();
  }

  onModuleInit() {
    console.log('TwilioService initialized');
  }

  private async getAccountSid(): Promise<string> {
    const accountSid = this.configService.get<string>('TWILIO_ACCOUNT_SID');
    return accountSid;
  }

  private async getAuthToken(): Promise<string> {
    const authToken = this.configService.get<string>('TWILIO_AUTH_TOKEN');
    return authToken;
  }

  private async getTwilioApiKey() {
    const apiKey = this.configService.get<string>('TWILIO_API_KEY');
    return apiKey;
  }
  private async getTwilioApiSecret() {
    const apiSecret = this.configService.get<string>('TWILIO_API_SECRET');
    return apiSecret;
  }

  private async getTwilioPhoneNumber(): Promise<string> {
    const twilioPhoneNumber = this.configService.get<string>(
      'TWILIO_PHONE_NUMBER',
    );
    return twilioPhoneNumber;
  }

  private async getMyPhoneNumber(): Promise<string> {
    const myPhoneNumber = this.configService.get<string>(
      'TWILIO_USER_PHONE_NUMBER',
    );
    return myPhoneNumber;
  }

  private async getTwilioClient(): Promise<Twilio.Twilio> {
    const accountSid = await this.getAccountSid();
    const authToken = await this.getAuthToken();
    return new Twilio.Twilio(accountSid, authToken);
  }

  async sendPhoneNumberVerificationCode(phoneNumberDto: PhoneNumberDto) {
    console.log('Sending verification code to:', phoneNumberDto);
    const { phoneNumber } = phoneNumberDto;

    const user = await this.userService.findUserByPhoneNumber(phoneNumber);

    console.log('User phoneNumber:', phoneNumber);

    if (!user) {
      throw new NotFoundException('User not found');
    }

    const client = await this.getTwilioClient();
    const twilioPhoneNumber = await this.getTwilioPhoneNumber();
    const verificationCode = await this.authService.generateVerificationCode();

    this.verificationStore.set(phoneNumber, verificationCode);

    await client.messages.create({
      body: `Your verification code is: ${verificationCode}`,
      from: twilioPhoneNumber,
      to: phoneNumber,
    });

    return {
      message: 'Verification code sent successfully',
    };
  }

  async verifyPhoneNumberCode(
    verifyPhoneNumberCodeDto: VerifyPhoneNumberCodeDto,
  ): Promise<boolean> {
    const { phoneNumber, code } = verifyPhoneNumberCodeDto;

    const storedCode = this.verificationStore.get(phoneNumber);

    if (!storedCode) {
      throw new NotFoundException('Verification code not found or expired');
    }

    if (storedCode !== code) {
      throw new NotFoundException('Invalid verification code');
    }

    this.verificationStore.delete(phoneNumber);

    return true;
  }

  async createRoom() {
    const client = await this.getTwilioClient();
    const room = await client.video.v1.rooms.create({
      type: 'go',
      uniqueName: 'My First Video Room',
    });

    console.log(room.sid);
  }

  async fetchRoom() {
    const client = await this.getTwilioClient();

    const room = await client.video.v1.rooms('DailyStandup').fetch();

    console.log(room.sid);

    return {
      message: room.sid,
    };
  }

  async generateTwilioAccessToken(identity: string, roomName: string) {
    const accountSid = await this.getAccountSid();
    const apiKey = await this.getTwilioApiKey();
    const apiSecret = await this.getTwilioApiSecret();

    if (!accountSid || !apiKey || !apiSecret) {
      throw new Error(
        'Twilio credentials are not properly configured in environment variables',
      );
    }

    const AccessToken = Twilio.jwt.AccessToken;

    const VideoGrant = AccessToken.VideoGrant;

    const videoGrant = new VideoGrant({
      room: roomName,
    });

    const token = new AccessToken(accountSid, apiKey, apiSecret, { identity });

    token.addGrant(videoGrant);
    console.log(token.toJwt());
    token.toJwt();

    return {
      token: token.toJwt(),
    };
  }
}
