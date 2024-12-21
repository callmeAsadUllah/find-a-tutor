import {
  MiddlewareConsumer,
  Module,
  NestModule,
  OnModuleInit,
  RequestMethod,
} from '@nestjs/common';
import { AdminController } from './admin.controller';
import { AdminService } from './admin.service';
import { UsersModule } from '../users/users.module';
import { MongooseModule } from '@nestjs/mongoose';
import {
  AccountActivationRequest,
  AccountActivationRequestSchema,
} from './admin.schema';
import { VerifyAccessTokenMiddleware } from 'src/common/middlewares/verify-access-token.middleware';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AuthModule } from '../auth/auth.module';

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
        name: AccountActivationRequest.name,
        useFactory: () => {
          return AccountActivationRequestSchema;
        },
      },
    ]),
    UsersModule,
    AuthModule,
  ],
  controllers: [AdminController],
  providers: [AdminService],
  exports: [AdminService],
})
export class AdminModule implements OnModuleInit, NestModule {
  async onModuleInit() {
    console.log('AdminModule initialized');
  }

  async configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(VerifyAccessTokenMiddleware)
      .forRoutes({ path: '/admin/accounts/users', method: RequestMethod.GET });
  }
}
