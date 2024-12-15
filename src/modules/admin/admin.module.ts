import { Module } from '@nestjs/common';
import { AdminController } from './admin.controller';
import { AdminService } from './admin.service';
import { UsersModule } from '../users/users.module';
import { MongooseModule } from '@nestjs/mongoose';
import {
  AccountActivationRequest,
  AccountActivationRequestSchema,
} from './admin.schema';

@Module({
  imports: [
    MongooseModule.forFeatureAsync([
      {
        name: AccountActivationRequest.name,
        useFactory: () => {
          return AccountActivationRequestSchema;
        },
      },
    ]),
    UsersModule,
  ],
  controllers: [AdminController],
  providers: [AdminService],
  exports: [AdminService],
})
export class AdminModule {}
