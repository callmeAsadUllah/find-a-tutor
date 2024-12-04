import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './modules/auth/auth.module';
import { UsersModule } from './modules/users/users.module';
import { AdminModule } from './modules/admin/admin.module';
import { StudentsModule } from './modules/students/students.module';
import { TwilioModule } from './modules/twilio/twilio.module';
import { JazzCashModule } from './modules/jazz-cash/jazz-cash.module';
import { TutorsModule } from './modules/tutors/tutors.module';

@Module({
  imports: [
    AuthModule,
    UsersModule,
    AdminModule,
    StudentsModule,
    TwilioModule,
    JazzCashModule,
    TutorsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
