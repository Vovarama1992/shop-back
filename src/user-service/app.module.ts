import { Module, Logger } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './src/auth/auth.module';
import { UsersModule } from './src/users/users.module';
import { JwtModule } from '@nestjs/jwt';
import { RedisModule } from 'src/shared-modules/redis/redis.module';
import { PrismaModule } from 'src/shared-modules/prisma/prisma.module';
import { KafkaModule } from 'src/shared-modules/kafka/kafka.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    AuthModule,
    KafkaModule,
    RedisModule,
    UsersModule,
    PrismaModule,
    JwtModule,
  ],
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
