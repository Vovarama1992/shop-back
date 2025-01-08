import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { join } from 'path';
import * as express from 'express';
import { existsSync, mkdirSync } from 'fs';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: [
      'http://localhost:3000',
      'https://test.maxiscomfort.ru',
      'https://smartwear.vercel.app',
    ],
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
    allowedHeaders: 'Content-Type, Accept, Authorization',
  });

  app.setGlobalPrefix('api');

  const articlesDir = join(__dirname, '..', 'images', 'articles');
  const paragraphsDir = join(__dirname, '..', 'images', 'paragraphs');

  if (!existsSync(articlesDir)) {
    mkdirSync(articlesDir, { recursive: true });
  }
  if (!existsSync(paragraphsDir)) {
    mkdirSync(paragraphsDir, { recursive: true });
  }

  app.use('/images', express.static(join(__dirname, '..', 'images')));

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
