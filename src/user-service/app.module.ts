import { Module, Logger } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './src/auth/auth.module';
import { UsersModule } from './src/users/users.module';
import { JwtModule } from '@nestjs/jwt';
import { RedisModule } from '../../src/shared-modules/redis/redis.module';
import { PrismaModule } from '../../src/shared-modules/prisma/prisma.module';
import { KafkaProducerService } from '../shared-modules/kafka/kafka.producer';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    AuthModule,
    RedisModule,
    UsersModule,
    PrismaModule,
    JwtModule,
  ],
  providers: [KafkaProducerService],
})
export class AppModule {
  private readonly logger = new Logger(AppModule.name);

  constructor() {
    Logger.overrideLogger(['log', 'error', 'warn', 'debug', 'verbose']);

    this.logger.log('NestJS app started');
    this.logger.error('This is an error message');
    this.logger.warn('This is a warning message');
  }
}
