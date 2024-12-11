import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { SeedersModule } from './modules/seeders/seeders.module';
import { AuthModule } from './modules/auth/auth.module';
import { UsersModule } from './modules/users/users.module';
import { AdminModule } from './modules/admin/admin.module';
import { StudentsModule } from './modules/students/students.module';
import { TwilioModule } from './modules/twilio/twilio.module';
import { TutorsModule } from './modules/tutors/tutors.module';
import { SubjectsModule } from './modules/subjects/subjects.module';

import { User, UserSchema } from './modules/users/user.schema';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
      cache: true,
    }),

    MongooseModule.forRootAsync({
      useFactory: (configService: ConfigService) => ({
        uri: configService.get<string>('MONGODB_URI'),
      }),
      inject: [ConfigService],
    }),

    MongooseModule.forFeatureAsync([
      {
        name: User.name,
        useFactory: () => {
          return UserSchema;
        },
      },
    ]),

    AuthModule,
    UsersModule,
    AdminModule,
    StudentsModule,
    TwilioModule,
    TutorsModule,
    SeedersModule,
    SubjectsModule,
  ],
})
export class AppModule {}
