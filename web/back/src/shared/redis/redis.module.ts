import { Module, Global, Logger } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { Redis } from 'ioredis';
import { RedisService } from './redis.service';

@Global()
@Module({
  providers: [
    {
      provide: 'REDIS_CLIENT',
      useFactory: (configService: ConfigService): Redis => {
        const redis = new Redis({
          host: configService.get<string>('REDIS_HOST'),
          port: configService.get<number>('REDIS_PORT'),
          db: configService.get<number>('REDIS_DB'),
        });
        redis.on('error', (err) => {
          if ((err as NodeJS.ErrnoException).code === 'ECONNREFUSED') {
            Logger.error(
              'Redis 连接被拒绝，确保 Redis 服务正在运行',
              err.message,
              'RedisModule',
            );
          } else {
            Logger.error('Redis 发生错误', err.message, 'RedisModule');
          }
        });
        return redis;
      },
      inject: [ConfigService],
    },
    RedisService,
  ],
  exports: ['REDIS_CLIENT', RedisService],
})
export class CustomRedisModule {}
