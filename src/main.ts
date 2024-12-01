import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Установка префикса /api для всех маршрутов
  app.setGlobalPrefix('api');

  await app.listen(3001);
}
bootstrap();
