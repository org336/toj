import { Global, Module } from '@nestjs/common';
import { EmailModule } from './mailer/email.module';
import { RedisModule } from './redis/redis.module';
@Global()
@Module({
  imports: [RedisModule, EmailModule],
})
export class SharedModule {}
