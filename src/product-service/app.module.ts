import { Module, Logger } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from 'src/shared-modules/prisma/prisma.module';
import { KafkaModule } from 'src/shared-modules/kafka/kafka.module';
import { ProductModule } from './product/product.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    PrismaModule,
    KafkaModule,
    ProductModule,
  ],
})
export class AppModule {
  private readonly logger = new Logger(AppModule.name);

  constructor() {
    Logger.overrideLogger(['log', 'error', 'warn', 'debug', 'verbose']);

    this.logger.log('Product service started');
  }
}
