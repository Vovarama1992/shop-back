import { Injectable, Logger } from '@nestjs/common';
import { Redis } from 'ioredis';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class RedisService {
  private redisClient: Redis;
  private readonly logger = new Logger(RedisService.name);

  constructor(private configService: ConfigService) {
    this.connectToRedis();
  }

  private async connectToRedis() {
    const host = this.configService.get<string>('REDIS_HOST');
    const port = this.configService.get<number>('REDIS_PORT');
    const db = this.configService.get<number>('REDIS_DB');
    const password = this.configService.get<string>('REDIS_PASSWORD');

    try {
      this.redisClient = new Redis({
        host,
        port,
        db,
        password,
        retryStrategy: (times) => {
          const delay = Math.min(times * 1000, 10000);
          this.logger.warn(`Retrying Redis connection in ${delay / 1000}s...`);
          return delay;
        },
      });

      this.redisClient.on('connect', () => {
        this.logger.log('Redis connected successfully.');
      });

      this.redisClient.on('error', (err) => {
        this.logger.error(`Redis connection error: ${err.message}`);
      });
    } catch (error) {
      this.logger.error('Failed to initialize Redis:', error.message);
    }
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

  async getUserByCode(code: string): Promise<{ userId: number } | null> {
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
