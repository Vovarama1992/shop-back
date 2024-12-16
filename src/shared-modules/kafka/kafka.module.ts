import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { KafkaProducerService } from './kafka.producer';
import { SmsConsumerController } from './sms.consumer';
import { SmsModule } from 'src/sms-service/sms/sms.module';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'KAFKA_SERVICE',
        transport: Transport.KAFKA,
        options: {
          client: {
            brokers: ['kafka:9093'],
          },
          consumer: {
            groupId: 'sms-service-group',
          },
        },
      },
    ]),
    SmsModule,
  ],
  controllers: [SmsConsumerController],
  providers: [KafkaProducerService],
  exports: [KafkaProducerService],
})
export class KafkaModule {}
