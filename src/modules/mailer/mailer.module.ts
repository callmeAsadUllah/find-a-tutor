import { forwardRef, Module } from '@nestjs/common';
import { MailerService } from './mailer.service';
import { UsersModule } from '../users/users.module';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [forwardRef(() => UsersModule), AuthModule],
  providers: [MailerService],
  exports: [MailerService],
})
export class MailerModule {}
