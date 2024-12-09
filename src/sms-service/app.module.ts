import { Module } from '@nestjs/common';
import { KafkaConsumer } from '../shared-modules/kafka/kafka.consumer';
import { SmsModule } from './sms/sms.module';
@Module({
  imports: [SmsModule],
  providers: [KafkaConsumer],
})
export class AppModule {}
