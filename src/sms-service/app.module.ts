import { Module } from '@nestjs/common';
import { KafkaConsumerController } from '../shared-modules/kafka/kafka.consumer';
import { SmsModule } from './sms/sms.module';
import { KafkaModule } from 'src/shared-modules/kafka/kafka.module';
@Module({
  imports: [SmsModule, KafkaModule],
  providers: [KafkaConsumerController],
})
export class AppModule {}
