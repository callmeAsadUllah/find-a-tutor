import { Injectable, OnModuleInit } from '@nestjs/common';
import { IResponse } from 'src/common/interfaces/response.interface';
import { IUser } from './interfaces/user.interface';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from './user.schema';
import { Model, Types } from 'mongoose';
import { UpdateUserDto } from './dtos/user.dto';

@Injectable()
export class UsersService implements OnModuleInit {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<UserDocument>,
  ) {}

  async onModuleInit() {
    console.log('UsersService initialized');
  }

  async findAllUsers(): Promise<Partial<IResponse<IUser[]>>> {
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
    } catch {
      throw new Error('Failed to retrieve users');
    }
  }

  async getUserById(
    userId: Types.ObjectId,
  ): Promise<Partial<IResponse<IUser | null>>> {
    const user = await this.userModel.findById(userId);
    if (!user) {
      throw new Error('User not found');
    }
    return {
      statusCode: 200,
      message: 'User retrieved successfully',
      data: user,
    };
  }

  async findUserByPhoneNumber(
    phoneNumber: string,
  ): Promise<Partial<IResponse<IUser | null>>> {
    const user = await this.userModel.findOne({
      phoneNumber: phoneNumber,
    });

    if (!user) {
      throw new Error('User not found');
    }

    return {
      statusCode: 200,
      message: 'User retrieved successfully',
      data: user,
    };
  }

  async getUserByIdAndUpdate(
    userId: Types.ObjectId,
    updateUserDto: UpdateUserDto,
  ): Promise<Partial<IResponse<IUser | null>>> {
    const updatedUser = await this.userModel.findByIdAndUpdate(
      userId,
      { ...updateUserDto },
      {
        new: true,
        runValidators: true,
      },
    );
    if (!updatedUser) {
      throw new Error('User not found');
    }
    return {
      statusCode: 200,
      message: 'User updated successfully',
      data: updatedUser,
    };
  }
}
