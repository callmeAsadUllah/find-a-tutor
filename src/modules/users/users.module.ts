import {
  forwardRef,
  MiddlewareConsumer,
  Module,
  NestModule,
  OnModuleInit,
  RequestMethod,
} from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import {
  Admin,
  AdminSchema,
  Student,
  StudentSchema,
  Tutor,
  TutorSchema,
  User,
  UserSchema,
} from './user.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { VerifyAccessTokenMiddleware } from 'src/common/middlewares/verify-access-token.middleware';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { MailerModule } from '../mailer/mailer.module';
import { AuthService } from '../auth/auth.service';
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
    forwardRef(() => MailerModule),
    forwardRef(() => TwilioModule),
  ],
  controllers: [UsersController],
  providers: [UsersService, AuthService],
  exports: [UsersService],
})
export class UsersModule implements NestModule, OnModuleInit {
  onModuleInit() {
    console.log('UsersModule initialized');
  }

  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(VerifyAccessTokenMiddleware)
      .forRoutes({ path: 'users/connect', method: RequestMethod.POST });
  }
}
