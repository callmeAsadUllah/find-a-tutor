import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { RegisterUserDto } from './dtos/auth.dto';
import { IResponse } from '../../common/interfaces/response.interface';
import { IUser } from '../users/interfaces/user.interface';
import { User, UserDocument } from '../users/user.schema';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<UserDocument>,
  ) {}

  async registerUser(
    registerUserDto: RegisterUserDto,
  ): Promise<IResponse<IUser>> {
    const existingUserEmail = await this.userModel.findOne({
      email: registerUserDto.email,
    });

    if (existingUserEmail) {
      throw new Error(`User already exists with this ${existingUserEmail}.`);
    }

    const existingUserUsername = await this.userModel.findOne({
      username: registerUserDto.username,
    });

    if (existingUserUsername) {
      throw new Error(`User already exists with this ${existingUserUsername}.`);
    }

    const registeringUser = new this.userModel({
      ...registerUserDto,
    });

    await registeringUser.save();

    return {
      statusCode: 200,
      message:
        'User registered successfully wait for the admin to approve your account',
      data: null,
    };
  }
}
