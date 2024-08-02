import { Injectable } from '@nestjs/common';
import { InjectQueue } from '@nestjs/bull';
import { Mail } from '~/constants/interface/common.interface';
import { Queue } from 'bull';
import { log } from 'console';

@Injectable()
export class QueueService {
  constructor(@InjectQueue('email') private readonly emailQueue: Queue) {}

  async addSendEmailJob(data: Mail) {
    await this.emailQueue.add('sendEmailCode', data);
  }
  async addWelcomeEmailJob(data: any) {
    await this.emailQueue.add('sendWelcome', data);
  }
}
