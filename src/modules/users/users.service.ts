import { Injectable, OnModuleInit } from '@nestjs/common';
import { IResponse } from 'src/common/interfaces/response.interface';
import { IUser } from './interfaces/user.interface';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from './user.schema';
import { Model, Types } from 'mongoose';
import { UpdateUserDto } from './dtos/user.dto';
import { ConnectDto } from './dtos/connect.dto';
import { Role } from 'src/common/enums/role.enum';
import { MailerService } from '../mailer/mailer.service';
import { MailDto } from '../mailer/dtos/mail.dto';
import { Gender } from 'src/common/enums/gender.enum';
import { Interest } from 'src/common/enums/interest.enum';
import { City } from 'src/common/enums/city.enum';
import { Grade } from 'src/common/enums/grade.enum';

@Injectable()
export class UsersService implements OnModuleInit {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<UserDocument>,
    private readonly mailerService: MailerService,
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

  async connectUser(
    connectDto: ConnectDto,
    firstName: string,
    lastName: string,
    gender: Gender,
    city: City,
    interests: Interest[],
    grade: Grade,
  ) {
    try {
      const { userId } = connectDto;

      const user = await this.userModel.findById(userId);

      const { role } = user;

      if (role && role === Role.STUDENT) {
        throw new Error(
          'Only students can connect to tutor not other students',
        );
      }

      const { email } = user;

      const mailDto: MailDto = {
        to: email,
        firstName: firstName,
        lastName: lastName,
        city: city,
        grade: grade,
        gender: gender,
        interests: interests,
      };

      const sendMail = this.mailerService.sendMail(mailDto);

      return {
        statusCode: 200,
        message: 'connection email has been sent to the tutor',
        data: sendMail,
      };
    } catch (error) {
      console.error(`${error.message}`);
      throw new Error(`${error.message}`);
    }
  }
}
