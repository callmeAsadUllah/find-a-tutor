import {
  forwardRef,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Twilio } from 'twilio';
import { AuthService } from '../auth/auth.service';
import { UsersService } from '../users/users.service';
import {
  PhoneNumberDto,
  VerifyPhoneNumberCodeDto,
} from '../auth/dtos/auth.dto';
import { IUser } from '../users/interfaces/user.interface';
import { IResponse } from 'src/common/interfaces/response.interface';

@Injectable()
export class TwilioService {
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

  private async getTwilioClient(): Promise<Twilio> {
    const accountSid = await this.getAccountSid();
    const authToken = await this.getAuthToken();
    return new Twilio(accountSid, authToken);
  }

  private async getAccountSid(): Promise<string> {
    const accountSid = this.configService.get<string>('TWILIO_ACCOUNT_SID');
    return accountSid;
  }

  private async getAuthToken(): Promise<string> {
    const authToken = this.configService.get<string>('TWILIO_AUTH_TOKEN');
    return authToken;
  }

  private async getTwilioPhoneNumber(): Promise<string> {
    const twilioPhoneNumber = this.configService.get<string>(
      'TWILIO_PHONE_NUMBER',
    );
    return twilioPhoneNumber;
  }

  private async getMyPhoneNumber(): Promise<string> {
    const myPhoneNumber = this.configService.get<string>('TWILIO_USER_NUMBER');
    return myPhoneNumber;
  }

  async sendPhoneNumberVerificationCode(
    phoneNumberDto: PhoneNumberDto,
  ): Promise<Partial<IResponse<IUser>>> {
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
}
