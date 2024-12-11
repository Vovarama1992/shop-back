import { Module } from '@nestjs/common';
import { SmsService } from './sms.service';
import { KafkaModule } from 'src/shared-modules/kafka/kafka.module';
import { KafkaConsumerController } from 'src/shared-modules/kafka/kafka.consumer';

@Module({
  imports: [KafkaModule],
  providers: [SmsService],
  controllers: [KafkaConsumerController],
  exports: [SmsService],
})
export class SmsModule {}
