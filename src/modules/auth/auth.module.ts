import { forwardRef, Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { MongooseModule } from '@nestjs/mongoose';
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
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { TwilioModule } from '../twilio/twilio.module';

@Module({
  imports: [
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        secret: configService.get<string>('ACCESS_TOKEN_SECRET'),
        signOptions: {
          expiresIn: configService.get<string>('ACCESS_TOKEN_EXPIRY'),
        },
      }),
      inject: [ConfigService],
    }),

    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        secret: configService.get<string>('REFRESH_TOKEN_SECRET'),
        signOptions: {
          expiresIn: configService.get<string>('REFRESH_TOKEN_EXPIRY'),
        },
      }),
      inject: [ConfigService],
    }),

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
    forwardRef(() => TwilioModule),
  ],
  controllers: [AuthController],
  providers: [AuthService],
  exports: [AuthService],
})
export class AuthModule {}
