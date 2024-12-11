// auth.module.ts
import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsersModule } from '../users/users.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { PrismaModule } from 'src/shared-modules/prisma/prisma.module';
import { RedisModule } from 'src/shared-modules/redis/redis.module';
import { KafkaModule } from 'src/shared-modules/kafka/kafka.module';

@Module({
  imports: [
    UsersModule,
    PrismaModule,
    RedisModule,
    KafkaModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_SECRET'),
        signOptions: { expiresIn: '1h' },
      }),
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
