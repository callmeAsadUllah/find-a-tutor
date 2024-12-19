import { forwardRef, Module, OnModuleInit } from '@nestjs/common';
import { TwilioService } from './twilio.service';
import { AuthModule } from '../auth/auth.module';
import { UsersModule } from '../users/users.module';
import { TwilioController } from './twilio.controller';

@Module({
  imports: [forwardRef(() => AuthModule), UsersModule],
  providers: [TwilioService],
  exports: [TwilioService],
  controllers: [TwilioController],
})
export class TwilioModule implements OnModuleInit {
  onModuleInit() {
    console.log('TwilioModule initialized');
  }
}
