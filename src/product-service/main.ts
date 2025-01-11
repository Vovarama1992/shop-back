import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { join } from 'path';
import { existsSync, mkdirSync } from 'fs';
import { ValidationPipe } from '@nestjs/common';
import * as dotenv from 'dotenv';
import { Logger } from '@nestjs/common';

dotenv.config();

async function bootstrap() {
  const logger = new Logger('Bootstrap'); // Логгер для всего процесса старта

  try {
    logger.log('Starting application...');
    const app = await NestFactory.create(AppModule);
    logger.log('Nest application instance created.');

    app.enableCors({
      origin: [
        'http://localhost:3000',
        'https://test.maxiscomfort.ru',
        //'https://smartwear.vercel.app',
      ],
      methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
      credentials: true,
      allowedHeaders: 'Content-Type, Accept, Authorization',
    });
    logger.log('CORS settings applied.');

    app.setGlobalPrefix('api');
    logger.log('Global prefix set to /api.');

    const uploadDir = join(process.cwd(), 'uploads/product-images');
    if (!existsSync(uploadDir)) {
      mkdirSync(uploadDir, { recursive: true });
      logger.log(`Directory created: ${uploadDir}`);
    } else {
      logger.log(`Directory already exists: ${uploadDir}`);
    }

    const config = new DocumentBuilder()
      .setTitle('Product API')
      .setDescription('API for managing products')
      .setVersion('1.0')
      .addBearerAuth()
      .build();
    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('/api/docs', app, document);
    logger.log('Swagger documentation setup completed.');

    app.useGlobalPipes(new ValidationPipe());
    logger.log('ValidationPipe applied.');

    await app.listen(3003);
    logger.log('Application listening on port 3003');
  } catch (error) {
    logger.error('Error during application startup:', error.message);
    logger.error(error.stack);
    process.exit(1); // Завершаем процесс с ошибкой
  }
}
bootstrap();
