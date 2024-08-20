import { Module } from '@nestjs/common';
import { BullModule } from '@nestjs/bull';
import { ConfigService } from '@nestjs/config';
import { QueueService } from './queue.service';
import { EmailModule } from '../../shared/mailer/email.module';
import { EmailProcessor } from './queue.processor';
import { QueueController } from './queue.controller';

@Module({
  controllers: [QueueController],
  providers: [QueueService, EmailProcessor],
  imports: [
    EmailModule,
    BullModule.forRootAsync({
      useFactory: async (configService: ConfigService) => ({
        redis: {
          host: configService.get<string>('REDIS_HOST'),
          port: configService.get<number>('REDIS_PORT'),
          db: configService.get<number>('REDIS_DB_1'),
        },
      }),
      inject: [ConfigService],
    }),
    BullModule.registerQueueAsync({ name: 'email' }), // 注册邮箱队列
  ],
  exports: [QueueService],
})
export class QueueModule {}
