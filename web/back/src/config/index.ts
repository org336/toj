import { DatabaseConfig, IDatabaseConfig, dbRegToken } from './database.config';
import { IMailerConfig, MailerConfig, mailerRegToken } from './mailer.config';
import { IRedisConfig, RedisConfig, redisRegToken } from './redis.config';
import {
  ISwaggerConfig,
  SwaggerConfig,
  swaggerRegToken,
} from './swagger.config';

export * from './redis.config';
export * from './database.config';
export * from './swagger.config';
export * from './mailer.config';
export type ConfigKeyPaths = RecordNamePaths<AllConfigType>;
export interface AllConfigType {
  [dbRegToken]: IDatabaseConfig;
  [mailerRegToken]: IMailerConfig;
  [redisRegToken]: IRedisConfig;
  [swaggerRegToken]: ISwaggerConfig;
}

export default {
  DatabaseConfig,
  MailerConfig,
  RedisConfig,
  SwaggerConfig,
};
