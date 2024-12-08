import { Injectable } from '@nestjs/common';
import { Redis } from 'ioredis';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class RedisService {
  private redisClient: Redis;

  constructor(private configService: ConfigService) {
    this.redisClient = new Redis({
      host: this.configService.get<string>('REDIS_HOST'),
      port: this.configService.get<number>('REDIS_PORT'),
      db: this.configService.get<number>('REDIS_DB'),
      password: this.configService.get<string>('REDIS_PASSWORD'),
    });
  }

  async setCode(userId: number, code: string): Promise<void> {
    await this.redisClient.set(userId.toString(), code, 'EX', 300);
  }

  async getCode(userId: number): Promise<string | null> {
    return await this.redisClient.get(userId.toString());
  }

  async deleteCode(userId: number): Promise<void> {
    await this.redisClient.del(userId.toString());
  }

  async getCodeByCode(code: string): Promise<{ userId: number } | null> {
    const keys = await this.redisClient.keys('*');
    for (const key of keys) {
      const storedCode = await this.redisClient.get(key);
      if (storedCode === code) {
        const userId = parseInt(key, 10);
        return { userId };
      }
    }
    return null;
  }
}
