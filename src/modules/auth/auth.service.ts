import {
  ForbiddenException,
  forwardRef,
  Inject,
  Injectable,
  OnModuleInit,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { LoginDto, RegisterDto } from './dtos/auth.dto';
import { IResponse } from '../../common/interfaces/response.interface';
import { IUser } from '../users/interfaces/user.interface';
import { User, UserDocument } from '../users/user.schema';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import * as cryptojs from 'crypto-js';
import { TwilioService } from '../twilio/twilio.service';

@Injectable()
export class AuthService implements OnModuleInit {
  constructor(
    @Inject(forwardRef(() => TwilioService))
    private readonly TwilioService: TwilioService,
    private readonly configService: ConfigService,
    private readonly jwtService: JwtService,

    @InjectModel(User.name) private readonly userModel: Model<UserDocument>,
  ) {}

  async onModuleInit() {
    console.log('AuthService initialized');
  }

  async generateVerificationCode(): Promise<string> {
    return cryptojs.lib.WordArray.random(4)
      .toString(cryptojs.enc.Hex)
      .substring(0, 6)
      .toLowerCase();
  }

  private async generateAccessToken(user): Promise<string> {
    const payload = {
      userId: user._id,
      username: user.username,
      firstName: user?.firstName,
      lastName: user?.lastName,
      email: user.email,
      role: user.role,
      phoneNumber: user.phoneNumber,
      city: user?.city,
      gender: user?.gender,
      grade: user?.grade,
      interests: user?.interests,
    };
    const secretKey = await this.getAccessToken();
    const expiresIn = await this.getAccessTokenExpiry();
    const accessToken = await this.jwtService.signAsync(payload, {
      secret: secretKey,
      expiresIn,
    });
    return accessToken;
  }

  private async generateRefreshToken(user): Promise<string> {
    const payload = { userId: user._id };
    const secretKey = await this.getRefreshToken();
    const expiresIn = await this.getRefreshTokenExpiry();
    const refreshToken = await this.jwtService.signAsync(payload, {
      secret: secretKey,
      expiresIn,
    });
    return refreshToken;
  }

  async getAccessToken(): Promise<string> {
    const token = this.configService.get<string>('ACCESS_TOKEN_SECRET');
    return token;
  }

  async getAccessTokenExpiry(): Promise<string> {
    const expiry = this.configService.get<string>('ACCESS_TOKEN_EXPIRY');
    return expiry;
  }

  async getRefreshToken(): Promise<string> {
    const token = this.configService.get<string>('REFRESH_TOKEN_SECRET');
    return token;
  }

  async getRefreshTokenExpiry(): Promise<string> {
    const expiry = this.configService.get<string>('REFRESH_TOKEN_EXPIRY');
    return expiry;
  }

  async logout(userId: string): Promise<{ user: User }> {
    const user = await this.userModel.findOneAndUpdate(
      { _id: userId },
      { $unset: { refreshToken: 1 } },
      { new: true },
    );

    if (!user) {
      throw new Error('user not found');
    }
    const loggedOutUser = await this.userModel
      .findById(user._id)
      .select('-password -refreshToken -createdAt -updatedAt -__v');

    return {
      user: loggedOutUser,
    };
  }

  private async validatePassword(
    plainPassword: string,
    hashedPassword: string,
  ): Promise<boolean> {
    return await bcrypt.compare(plainPassword, hashedPassword);
  }

  async register(registerDto: RegisterDto): Promise<Partial<IResponse<IUser>>> {
    const existingUser = await this.userModel.findOne({
      email: registerDto.email,
      username: registerDto.username,
    });

    if (existingUser) {
      throw new Error(
        `User already exists with this ${registerDto.email} or ${registerDto.username}.`,
      );
    }

    const { role, ...userDetails } = registerDto;

    const registeringUser = new this.userModel({
      role,
      ...userDetails,
    });

    await registeringUser.save();

    return {
      statusCode: 200,
      message: `User registered successfully with the role:${role}.\nPlease wait for the admin to approve your account.`,
      data: null,
    };
  }

  async login(loginDto: LoginDto): Promise<Partial<IResponse<IUser>>> {
    const user = await this.userModel.findOne({
      email: loginDto.email,
    });

    if (!user) {
      console.log('Invalid credentials');
      throw new UnauthorizedException('Invalid credentials');
    }

    const isPasswordValid = await this.validatePassword(
      loginDto.password,
      user.password,
    );

    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const accessToken = await this.generateAccessToken(user);
    const refreshToken = await this.generateRefreshToken(user);

    user.refreshToken = refreshToken;

    await user.save();

    return {
      statusCode: 200,
      message: 'Login successful',
      data: user,
      accessToken,
      refreshToken,
    };
  }

  async refreshToken(
    refreshToken: string,
  ): Promise<{ accessToken: string; refreshToken: string }> {
    const secretKey = await this.getRefreshToken();
    const decodedToken = await this.jwtService.verifyAsync(refreshToken, {
      secret: secretKey,
    });
    const user = await this.userModel.findById(decodedToken.userId);

    if (!user || user.refreshToken !== refreshToken) {
      throw new UnauthorizedException('Invalid refresh token');
    }

    const accessToken = await this.generateAccessToken(user);
    const newRefreshToken = await this.generateRefreshToken(user);

    if (!accessToken || !newRefreshToken) {
      throw new ForbiddenException('there is an issue with tokens');
    }

    user.refreshToken = newRefreshToken;

    await user.save();

    return {
      accessToken,
      refreshToken: newRefreshToken,
    };
  }
}
