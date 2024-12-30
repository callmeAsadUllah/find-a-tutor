import {
  forwardRef,
  Inject,
  Injectable,
  OnModuleDestroy,
  OnModuleInit,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from './user.schema';
import { Model, Types } from 'mongoose';
import { UpdateUserDto } from './dtos/user.dto';
import { ConnectDto } from './dtos/connect.dto';
import { Role } from 'src/common/enums/role.enum';
import { MailerService } from '../mailer/mailer.service';
import { MailDto } from '../mailer/dtos/mail.dto';
import { City } from 'src/common/enums/city.enum';

@Injectable()
export class UsersService implements OnModuleInit, OnModuleDestroy {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<UserDocument>,
    @Inject(forwardRef(() => MailerService))
    private readonly mailerService: MailerService,
  ) {}

  async onModuleInit() {
    console.log('UsersService initialized');
  }

  async onModuleDestroy() {
    console.log('UsersService destroyed');
  }

  async findAllUsers(city: City, role: Role, page: number, limit: number) {
    try {
      page = page > 0 ? page : 1;
      limit = limit > 0 ? limit : 10;

      const skip = (page - 1) * limit;

      const filter: Record<string, any> = {};

      if (city)
        filter.city = {
          $regex: new RegExp(city, 'i'),
        };
      if (role)
        filter.role = {
          $regex: new RegExp(role, 'i'),
        };

      const count = await this.userModel.countDocuments(filter);

      const users = await this.userModel.aggregate([
        {
          $match: filter,
        },
        {
          $project: {
            _id: 0,
            password: 0,
            refreshToken: 0,
          },
        },
        {
          $skip: skip,
        },
        {
          $limit: limit,
        },
      ]);

      if (!users) {
        throw new Error('No users found');
      }

      return {
        statusCode: 200,
        message: 'Users retrieved successfully',
        data: users,
        meta: {
          total: count,
          page,
          limit,
        },
      };
    } catch {
      throw new Error('Failed to retrieve users');
    }
  }

  async getUserById(userId: Types.ObjectId) {
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

  async findUserByPhoneNumber(phoneNumber: string) {
    const user = await this.userModel.findOne({
      phoneNumber: phoneNumber,
    });

    if (!user) {
      throw new Error('User not found');
    }

    return user;
  }

  async findUserByEmail(email: string) {
    const user = await this.userModel.findOne({
      email: email,
    });

    if (!user) {
      throw new Error('User not found');
    }

    return user;
  }

  async getUserByIdAndUpdate(
    userId: Types.ObjectId,
    updateUserDto: UpdateUserDto,
  ) {
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

  async connectUser(connectDto: ConnectDto) {
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
