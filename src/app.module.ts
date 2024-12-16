import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { SeedersModule } from './modules/seeders/seeders.module';
import { AuthModule } from './modules/auth/auth.module';
import { UsersModule } from './modules/users/users.module';
import { AdminModule } from './modules/admin/admin.module';

import {
  Admin,
  AdminSchema,
  Student,
  StudentSchema,
  Tutor,
  TutorSchema,
  User,
  UserSchema,
} from './modules/users/user.schema';
import { TwilioModule } from './modules/twilio/twilio.module';
import { EventsGateway } from './common/events/events.gateway';
import {
  AccountActivationRequest,
  AccountActivationRequestSchema,
} from './modules/admin/admin.schema';
import { MailerModule } from './modules/mailer/mailer.module';

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
          const schema = UserSchema;
          schema.discriminator(Student.name, StudentSchema);
          schema.discriminator(Tutor.name, TutorSchema);
          schema.discriminator(Admin.name, AdminSchema);
          return schema;
        },
      },
      {
        name: AccountActivationRequest.name,
        useFactory: () => {
          return AccountActivationRequestSchema;
        },
      },
    ]),
    AuthModule,
    UsersModule,
    AdminModule,
    SeedersModule,
    TwilioModule,
    MailerModule,
  ],
  providers: [EventsGateway],
})
export class AppModule {}
