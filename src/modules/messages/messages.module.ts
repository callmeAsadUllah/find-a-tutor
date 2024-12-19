import { Module, OnModuleInit } from '@nestjs/common';
import { MessagesGateway } from './messages.gateway';
import { MongooseModule } from '@nestjs/mongoose';
import { Message, MessageSchema } from './message.schema';

@Module({
  imports: [
    MongooseModule.forFeatureAsync([
      {
        name: Message.name,
        useFactory: () => {
          return MessageSchema;
        },
      },
    ]),
  ],
  providers: [MessagesGateway],
})
export class MessagesModule implements OnModuleInit {
  onModuleInit() {
    console.log('MessagesModule initialized');
  }
}
