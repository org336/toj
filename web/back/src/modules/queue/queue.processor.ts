import { Processor, Process, OnQueueActive } from '@nestjs/bull';
import { EmailService } from '../../shared/mailer/email.service';
import { Mail } from '~/constants/interface/common.interface';
import { Job } from 'bull';

@Processor('email')
export class EmailProcessor {
  constructor(private readonly emailService: EmailService) {}
  @Process('sendEmailCode')
  async handleSendEmailJob(job: Job<Mail>): Promise<void> {
    const { email, purpose } = job.data;
    await this.emailService.sendEmailCode(email, purpose);
  }
  @Process('sendWelcome')
  async handleWelcomeEmailJob(job: Job<any>): Promise<void> {
    const { email } = job.data;
    await this.emailService.sendWelcomeEmail(email);
  }
}
