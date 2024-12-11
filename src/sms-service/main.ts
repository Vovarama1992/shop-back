import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const logger = new Logger('SMS-Service');
  logger.log('SMS Service is starting...');

  await app.listen(3002);

  logger.log('SMS Service started and listening for Kafka messages');
}
bootstrap();
