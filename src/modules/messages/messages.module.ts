import { Module, OnModuleInit } from '@nestjs/common';
import { MessagesGateway } from './messages.gateway';
import { MongooseModule } from '@nestjs/mongoose';
import { Message, MessageSchema } from './message.schema';
import { AuthModule } from '../auth/auth.module';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';

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
    MongooseModule.forFeatureAsync([
      {
        name: Message.name,
        useFactory: () => {
          return MessageSchema;
        },
      },
    ]),
    AuthModule,
  ],
  providers: [MessagesGateway],
  exports: [MessagesGateway],
})
export class MessagesModule implements OnModuleInit {
  onModuleInit() {
    console.log('MessagesModule initialized');
  }
}
