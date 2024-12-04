import { Module } from '@nestjs/common';
import { JazzCashService } from './jazz-cash.service';
import { JazzCashController } from './jazz-cash.controller';

@Module({
  providers: [JazzCashService],
  controllers: [JazzCashController]
})
export class JazzCashModule {}
