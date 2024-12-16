import { Module } from '@nestjs/common';
import { AccountsService } from './accounts.service';
import { AccountsController } from './accounts.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Account, AccountSchema } from './account.schema';

@Module({
  imports: [
    MongooseModule.forFeatureAsync([
      {
        name: Account.name,
        useFactory: () => {
          return AccountSchema;
        },
      },
    ]),
  ],
  providers: [AccountsService],
  controllers: [AccountsController],
})
export class AccountsModule {}
