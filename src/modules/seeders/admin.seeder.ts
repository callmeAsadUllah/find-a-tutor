import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';
import { Role } from 'src/common/enums/role.enum';
import { User, UserDocument } from '../users/user.schema';
import { Gender } from 'src/common/enums/gender.enum';

@Injectable()
export class AdminSeeder {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<UserDocument>,
  ) {}

  async seed() {
    try {
      const adminExists = await this.userModel.findOne({
        email: 'admin@example.com',
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
          gender: Gender.MALE,
          isActive: true,
          isVerified: true,
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
