import { Inject, Injectable } from '@nestjs/common';
import Redis from 'ioredis';
@Injectable()
export class RedisService {
  constructor(@Inject('REDIS_CLIENT') private readonly redisClient: Redis) {}
  async get(key: string): Promise<string> {
    return await this.redisClient.get(key);
  }

  async setEx(key: string, value: string, expire: number): Promise<void> {
    await this.redisClient.set(key, value, 'EX', expire);
  }
  async set(key: string, value: string): Promise<void> {
    await this.redisClient.set(key, value);
  }

  async del(key: string): Promise<void> {
    await this.redisClient.del(key);
  }

  async keys(pattern: string): Promise<string[]> {
    return await this.redisClient.keys(pattern);
  }
}
