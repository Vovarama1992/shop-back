import { Module, Logger } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { JwtModule } from '@nestjs/jwt';
import { RedisModule } from './redis/redis.module';
import { PrismaModule } from './prisma/prisma.module';
import { SmsModule } from './sms/sms.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    AuthModule,
    SmsModule,
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
