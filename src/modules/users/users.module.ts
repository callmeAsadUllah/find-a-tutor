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
import { TwilioModule } from '../twilio/twilio.module';
import { AuthModule } from '../auth/auth.module';
import { Request, RequestSchema } from '../requests/request.schema';
import { PaymentsModule } from '../payments/payments.module';
import { Product, ProductSchema } from '../products/product.schema';
import { Price, PriceSchema } from '../prices/price.schema';

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
    MongooseModule.forFeatureAsync([
      {
        name: Request.name,
        useFactory: () => {
          return RequestSchema;
        },
      },
    ]),
    MongooseModule.forFeatureAsync([
      {
        name: Product.name,
        useFactory: () => {
          return ProductSchema;
        },
      },
    ]),
    MongooseModule.forFeatureAsync([
      {
        name: Price.name,
        useFactory: () => {
          return PriceSchema;
        },
      },
    ]),
    forwardRef(() => MailerModule),
    forwardRef(() => TwilioModule),
    AuthModule,
    PaymentsModule,
  ],
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService],
})
export class UsersModule implements OnModuleInit, NestModule {
  async onModuleInit() {
    console.log('UsersModule initialized');
  }

  async configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(VerifyAccessTokenMiddleware)
      .forRoutes(
        { path: 'users/connect', method: RequestMethod.POST },
        { path: 'users/tutors', method: RequestMethod.GET },
        { path: 'users/plans', method: RequestMethod.POST },
        { path: 'users/prices', method: RequestMethod.POST },
      );
  }
}
