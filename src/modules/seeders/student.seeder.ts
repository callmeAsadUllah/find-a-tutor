import { Injectable, OnModuleInit } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as bcrypt from 'bcryptjs';
import { Role } from 'src/common/enums/role.enum';
import { User, UserDocument } from '../users/user.schema';
import { Gender } from 'src/common/enums/gender.enum';
import { City } from 'src/common/enums/city.enum';
import { Grade } from 'src/common/enums/grade.enum';
import { Interest } from 'src/common/enums/interest.enum';

@Injectable()
export class StudentSeeder implements OnModuleInit {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<UserDocument>,
  ) {}

  async onModuleInit() {
    console.log('StudentSeeder initialized');
  }
  async seed() {
    try {
      const students = [
        {
          username: 'alex_johnson',
          firstName: 'Alex',
          lastName: 'Johnson',
          email: 'alex.johnson@example.com',
          phoneNumber: '+92300100100',
          password: 'studentPassword123',
          gender: Gender.MALE,
          city: City.ISLAMABAD,
          grade: Grade.GRADE_10,
          interests: [Interest.MATHEMATICS, Interest.SCIENCE],
        },
        {
          username: 'lisa_white',
          firstName: 'Lisa',
          lastName: 'White',
          email: 'lisa.white@example.com',
          phoneNumber: '+92300200200',
          password: 'studentPassword123',
          gender: Gender.FEMALE,
          city: City.KARACHI,
          grade: Grade.GRADE_12,
          interests: [Interest.SOCIOLOGY, Interest.ART],
        },
        {
          username: 'kevin_clark',
          firstName: 'Kevin',
          lastName: 'Clark',
          email: 'kevin.clark@example.com',
          phoneNumber: '+92300300301',
          password: 'studentPassword123',
          gender: Gender.MALE,
          city: City.LAHORE,
          grade: Grade.O_LEVEL,
          interests: [Interest.MUSIC, Interest.HISTORY],
        },
        {
          username: 'emma_davis',
          firstName: 'Emma',
          lastName: 'Davis',
          email: 'emma.davis@example.com',
          phoneNumber: '+92300400401',
          password: 'studentPassword123',
          gender: Gender.FEMALE,
          city: City.PESHAWAR,
          grade: Grade.GRADE_8,
          interests: [Interest.BIOLOGY, Interest.PHYSICS],
        },
      ];

      for (const studentData of students) {
        const studentExists = await this.userModel.findOne({
          email: studentData.email,
        });

        if (!studentExists) {
          const hashedPassword = await bcrypt.hash(studentData.password, 10);

          const student = new this.userModel({
            username: studentData.username,
            firstName: studentData.firstName,
            lastName: studentData.lastName,
            email: studentData.email,
            phoneNumber: studentData.phoneNumber,
            password: hashedPassword,
            role: Role.STUDENT,
            type: 'Student',
            gender: studentData.gender,
            city: studentData.city,
            grade: studentData.grade,
            interests: [Interest.BIOLOGY, Interest.PHYSICS],
            isActive: true,
            isPhoneNumberVerified: true,
            isEmailVerified: true,
          });

          await student.save();
          console.log(
            `student ${studentData.username} has been seeded successfully`,
          );
        } else {
          console.log(`Student ${studentData.username} already exists`);
        }
      }
    } catch (error) {
      console.error('Error seeding student users:', error);
      throw error;
    }
  }
}
