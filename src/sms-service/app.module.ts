import { Module } from '@nestjs/common';
import { KafkaConsumerController } from '../shared-modules/kafka/kafka.consumer';
import { SmsModule } from './sms/sms.module';
@Module({
  imports: [SmsModule],
  providers: [KafkaConsumerController],
})
export class AppModule {}
