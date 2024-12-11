import { Module } from '@nestjs/common';
import { SmsService } from './sms.service';
import { KafkaConsumerController } from 'src/shared-modules/kafka/kafka.consumer';

@Module({
  providers: [SmsService],
  controllers: [KafkaConsumerController],
  exports: [SmsService],
})
export class SmsModule {}
