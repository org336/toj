import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Inject, Injectable } from '@nestjs/common';
import { Cache } from 'cache-manager';
@Injectable()
export class RedisService {
  constructor(@Inject(CACHE_MANAGER) private readonly cacheManager: Cache) {}
  // 查询key
  async get<T>(key: string): Promise<T> {
    return await this.cacheManager.get(key);
  }

  // 过期时间可选
  async set(key: string, value: any, ttl?: number): Promise<void> {
    return await this.cacheManager.set(key, value, ttl);
  }
}
