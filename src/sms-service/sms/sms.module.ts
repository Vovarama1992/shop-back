import { Module } from '@nestjs/common';
import { SmsService } from './sms.service';

@Module({
  imports: [],
  providers: [SmsService],
  controllers: [],
  exports: [SmsService],
})
export class SmsModule {}
