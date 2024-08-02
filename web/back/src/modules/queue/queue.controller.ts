import { Controller, Post, Query, Body } from '@nestjs/common';
import { Public } from '~/common/decorators/common.decorator';
import { QueueService } from './queue.service';
@Controller()
export class QueueController {
  constructor(private readonly queueService: QueueService) {}
  @Public()
  @Post('/email/verify-code')
  async sendEmailCode(@Body() data: { email: string; purpose: string }) {
    return await this.queueService.addSendEmailJob(data);
  }
  @Public()
  @Post('/email/welcome')
  async sendWelcomeEmail(@Body() data: { email: string }) {
    return await this.queueService.addWelcomeEmailJob(data);
  }
}
