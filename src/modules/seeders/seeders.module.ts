import { Module } from '@nestjs/common';
import {
  Admin,
  AdminSchema,
  Student,
  StudentSchema,
  Tutor,
  TutorSchema,
  User,
  UserSchema,
} from '../users/user.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { AdminSeeder } from './admin.seeder';
import { TutorSeeder } from './tutor.seeder';
import { StudentSeeder } from './student.seeder';

@Module({
  imports: [
    MongooseModule.forFeatureAsync([
      {
        name: User.name,
        useFactory: () => {
          const schema = UserSchema;
          schema.discriminator(Student.name, StudentSchema);
          schema.discriminator(Tutor.name, TutorSchema);
          schema.discriminator(Admin.name, AdminSchema);
          return schema;
        },
      },
    ]),
  ],
  providers: [AdminSeeder, TutorSeeder, StudentSeeder],
  exports: [AdminSeeder, TutorSeeder, StudentSeeder],
})
export class SeedersModule {}
