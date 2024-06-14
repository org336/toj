import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';
import { RedisService } from '../redis/redis.service';

@Injectable()
export class EmailService {
  constructor(
    private readonly mailerService: MailerService,
    private readonly redisService: RedisService,
  ) {}

  // 生成随机验证码
  private generateVerificationCode(): string {
    const code = Math.floor(100000 + Math.random() * 900000).toString(); // 生成六位随机数
    return code;
  }

  // 存储验证码到Redis中，并记录发送次数和时间
  private async storeEmailCode(email: string, code: string): Promise<void> {
    // 检查Redis中关于该邮箱的发送记录
    // 如果存在，更新发送次数和时间
    // 如果不存在，创建新记录并设置发送次数为1和当前时间
  }

  // 检查是否可以发送邮件
  private async canSendEmail(email: string): Promise<void> {
    // 从Redis获取该邮箱的发送记录
    // 检查发送频率和每日发送次数是否在限制范围内
    // 如果在限制范围内，返回true
    // 否则，返回false
  }

  // 使用模板发送验证码到指定邮箱
  async sendEmailCode(email: string): Promise<void> {
    const code = this.generateVerificationCode();
    await this.storeEmailCode(email, code);

    await this.mailerService.sendMail({
      to: email,
      subject: '您的验证码',
      template: './template/verify.code..ejs',
      context: {
        code: code,
      },
    });
  }
}
