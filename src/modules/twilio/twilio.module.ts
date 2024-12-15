import { forwardRef, Module } from '@nestjs/common';
import { TwilioService } from './twilio.service';
import { AuthModule } from '../auth/auth.module';
import { UsersModule } from '../users/users.module';

@Module({
  imports: [forwardRef(() => AuthModule), UsersModule],
  controllers: [],
  providers: [TwilioService],
  exports: [TwilioService],
})
export class TwilioModule {}
