import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as dotenv from 'dotenv';
import { KafkaProducer } from './src/kafka/kafka.producer';
dotenv.config();

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const producerService = app.get(KafkaProducer);
  await producerService.sendCode('1234567890', '1234', false);

  app.enableCors({
    origin: ['http://localhost:3000', 'https://test.maxiscomfort.ru'],
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
    allowedHeaders: 'Content-Type, Accept, Authorization',
  });

  app.setGlobalPrefix('api');

  const config = new DocumentBuilder()
    .setTitle('API Documentation')
    .setDescription('The API description')
    .setVersion('1.0')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('/api/docs', app, document);

  await app.listen(3001);
}
bootstrap();
