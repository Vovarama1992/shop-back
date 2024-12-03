import { Module } from '@nestjs/common';
import { SmsService } from './smms.service';

@Module({
  providers: [SmsService],
  exports: [SmsService],
})
export class SmsModule {}
