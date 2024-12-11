import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';
import { Transport } from '@nestjs/microservices';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const logger = new Logger('SMS-Service');
  logger.log('SMS Service is starting...');

  // Подключение Kafka-микросервиса
  app.connectMicroservice({
    transport: Transport.KAFKA,
    options: {
      client: {
        brokers: ['kafka:9093'], // Укажите ваши брокеры
      },
      consumer: {
        groupId: 'sms-service-group', // Укажите ваш groupId
      },
    },
  });

  // Запускаем оба сервиса
  await app.startAllMicroservices();
  await app.listen(3002);

  logger.log(
    'SMS Service started and listening for HTTP requests and Kafka messages',
  );
}
bootstrap();
