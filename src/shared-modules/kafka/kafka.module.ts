import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { KafkaProducerService } from './kafka.producer';
import { KafkaConsumerController } from './kafka.consumer';

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
        },
      },
    ]),
  ],
  controllers: [KafkaConsumerController],
  providers: [KafkaProducerService],
  exports: [KafkaProducerService],
})
export class KafkaModule {}