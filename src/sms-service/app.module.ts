import { Module } from '@nestjs/common';
import { SmsModule } from './sms/sms.module';
import { KafkaModule } from 'src/shared-modules/kafka/kafka.module';
@Module({
  imports: [SmsModule, KafkaModule],
})
export class AppModule {}
