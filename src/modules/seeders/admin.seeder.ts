import { Injectable, OnModuleInit } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as bcrypt from 'bcryptjs';
import { Role } from 'src/common/enums/role.enum';
import { User, UserDocument } from '../users/user.schema';
import { Gender } from 'src/common/enums/gender.enum';

@Injectable()
export class AdminSeeder implements OnModuleInit {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<UserDocument>,
  ) {}

  async onModuleInit() {
    console.log('AdminSeeder initialized');
  }

  async seed() {
    try {
      const adminExists = await this.userModel.findOne({
        email: 'm.asadullah@efat.io',
      });

      if (!adminExists) {
        const hashedPassword = await bcrypt.hash('adminPassword123', 10);

        const admin = new this.userModel({
          username: 'asadullah',
          firstName: 'Muhammad',
          lastName: 'Asad Ullah',
          email: 'm.asadullah@efat.io',
          phoneNumber: '+923390113141',
          password: hashedPassword,
          role: Role.ADMIN,
          type: 'Admin',
          gender: Gender.MALE,
          isActive: true,
          isPhoneNumberVerified: true,
          isEmailVerified: true,
        });

        await admin.save();
        console.log('Admin user has been seeded successfully');
      } else {
        console.log('Admin user already exists');
      }
    } catch (error) {
      console.error('Error seeding admin user:', error);
      throw error;
    }
  }
}
