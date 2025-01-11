import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { join } from 'path';
import * as express from 'express';
import { existsSync, mkdirSync } from 'fs';
import { Logger } from '@nestjs/common';

async function bootstrap() {
  const logger = new Logger('Bootstrap'); // Логгер для старта приложения

  try {
    logger.log('Starting application...');
    const app = await NestFactory.create(AppModule);
    logger.log('Nest application instance created.');

    app.enableCors({
      origin: [
        'http://localhost:3000',
        'https://test.maxiscomfort.ru',
        'https://smartwear.vercel.app/',
      ],
      methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
      credentials: true,
      allowedHeaders: 'Content-Type, Accept, Authorization',
    });
    logger.log('CORS settings applied.');

    app.setGlobalPrefix('api');
    logger.log('Global prefix set to /api.');

    const articlesDir = join(__dirname, '..', 'images', 'articles');
    const paragraphsDir = join(__dirname, '..', 'images', 'paragraphs');

    if (!existsSync(articlesDir)) {
      mkdirSync(articlesDir, { recursive: true });
      logger.log(`Directory created: ${articlesDir}`);
    } else {
      logger.log(`Directory already exists: ${articlesDir}`);
    }

    if (!existsSync(paragraphsDir)) {
      mkdirSync(paragraphsDir, { recursive: true });
      logger.log(`Directory created: ${paragraphsDir}`);
    } else {
      logger.log(`Directory already exists: ${paragraphsDir}`);
    }

    app.use('/images', express.static(join(__dirname, '..', 'images')));
    logger.log('Static file serving setup for /images.');

    const config = new DocumentBuilder()
      .setTitle('API Documentation')
      .setDescription('The API description')
      .setVersion('1.0')
      .addBearerAuth()
      .build();
    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('/api/docs', app, document);
    logger.log('Swagger documentation setup completed.');

    await app.listen(3001);
    logger.log('Application listening on port 3001');
  } catch (error) {
    logger.error('Error during application startup:', error.message);
    logger.error(error.stack);
    process.exit(1); // Завершаем процесс с ошибкой
  }
}
bootstrap();
