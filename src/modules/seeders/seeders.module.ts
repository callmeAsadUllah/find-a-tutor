import { Module } from '@nestjs/common';
import { User, UserSchema } from '../users/user.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { AdminSeeder } from './admin.seeder';

@Module({
  imports: [
    MongooseModule.forFeatureAsync([
      {
        name: User.name,
        useFactory: () => {
          return UserSchema;
        },
      },
    ]),
  ],
  providers: [AdminSeeder],
  exports: [AdminSeeder],
})
export class SeedersModule {}
