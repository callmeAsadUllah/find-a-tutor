import { Injectable, OnModuleInit } from '@nestjs/common';
import { IResponse } from 'src/common/interfaces/response.interface';
import { IUser } from './interfaces/user.interface';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from './user.schema';
import { Model } from 'mongoose';

@Injectable()
export class UsersService implements OnModuleInit {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<UserDocument>,
  ) {}

  async onModuleInit() {
    console.log('UsersService initialized');
  }

  async findAllUsers(): Promise<Partial<IResponse<IUser[] | null>>> {
    try {
      const users = await this.userModel.find().exec();
      if (!users) {
        throw new Error('No users found');
      }
      return {
        statusCode: 200,
        message: 'Users retrieved successfully',
        data: users,
      };
    } catch (error) {
      console.error('Error fetching users:', error.message);
      throw new Error('Failed to retrieve users');
    }
  }
}
