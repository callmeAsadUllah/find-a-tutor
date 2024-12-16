import { Injectable, OnModuleInit } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';
import { Role } from 'src/common/enums/role.enum';
import { User, UserDocument } from '../users/user.schema';
import { Gender } from 'src/common/enums/gender.enum';
import { Availability } from 'src/common/enums/availability.enum';
import { Qualification } from 'src/common/enums/qualification.enum';
import { RateType } from 'src/common/enums/rate-type.enum';
import { City } from 'src/common/enums/city.enum';

@Injectable()
export class TutorSeeder implements OnModuleInit {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<UserDocument>,
  ) {}

  async onModuleInit() {
    console.log('TutorSeeder initialized');
  }
  async seed() {
    try {
      const tutors = [
        {
          username: 'john_doe',
          firstName: 'John',
          lastName: 'Doe',
          email: 'john.doe@example.com',
          phoneNumber: '+92300300300',
          password: 'tutorPassword123',
          gender: Gender.MALE,
          city: City.GUJRANWALA,
          rateType: RateType.HOURLY,
          rates: 200,
          experience: 4,
          qualification: Qualification.PHD,
          availability: [Availability.MON_1PM_4PM],
        },
        {
          username: 'jane_smith',
          firstName: 'Jane',
          lastName: 'Smith',
          email: 'jane.smith@example.com',
          phoneNumber: '+92300400400',
          password: 'tutorPassword123',
          gender: Gender.FEMALE,
          city: City.KARACHI,
          rateType: RateType.MONTHLY,
          rates: 15000,
          experience: 4,
          qualification: Qualification.DIPLOMA,
          availability: [Availability.TUE_9AM_12PM, Availability.TUE_1PM_4PM],
        },
        {
          username: 'mike_jones',
          firstName: 'Mike',
          lastName: 'Jones',
          email: 'mike.jones@example.com',
          phoneNumber: '+92300500500',
          password: 'tutorPassword123',
          gender: Gender.MALE,
          city: City.LAHORE,
          rateType: RateType.HOURLY,
          rates: 150,
          experience: 2,
          qualification: Qualification.PHD,
          availability: [Availability.MON_9AM_12PM, Availability.FRI_1PM_4PM],
        },
        {
          username: 'anna_brown',
          firstName: 'Anna',
          lastName: 'Brown',
          email: 'anna.brown@example.com',
          phoneNumber: '+92300600600',
          password: 'tutorPassword123',
          gender: Gender.FEMALE,
          city: City.GUJRANWALA,
          rateType: RateType.MONTHLY,
          rates: 17000,
          experience: 5,
          qualification: Qualification.MASTERS,
          availability: [Availability.MON_9AM_12PM, Availability.SUN_9AM_12PM],
        },
      ];

      for (const tutorData of tutors) {
        const tutorExists = await this.userModel.findOne({
          email: tutorData.email,
        });

        if (!tutorExists) {
          const hashedPassword = await bcrypt.hash(tutorData.password, 10);

          const tutor = new this.userModel({
            username: tutorData.username,
            firstName: tutorData.firstName,
            lastName: tutorData.lastName,
            email: tutorData.email,
            phoneNumber: tutorData.phoneNumber,
            password: hashedPassword,
            role: Role.TUTOR,
            type: 'Tutor',
            gender: tutorData.gender,
            city: tutorData.city,
            rateType: tutorData.rateType,
            rates: tutorData.rates,
            experience: tutorData.experience,
            qualification: tutorData.qualification,
            availability: tutorData.availability,
            isActive: true,
            isPhoneNumberVerified: true,
            isEmailVerified: true,
          });

          await tutor.save();
          console.log(
            `Tutor ${tutorData.username} has been seeded successfully`,
          );
        } else {
          console.log(`Tutor ${tutorData.username} already exists`);
        }
      }
    } catch (error) {
      console.error('Error seeding tutor users:', error);
      throw error;
    }
  }
}
