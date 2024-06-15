import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';
import { RedisService } from '../redis/redis.service';
import { ApiException } from '~/constants/exception/api.exception';
import { ApiCode } from '~/constants/enums/api-code.enums';
import { formatDateTime } from '~/utils/timeformat.util';
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
    const emailKey = `emailcode:${email}`;
    const currentDataRaw = await this.redisService.get(emailKey);
    let currentData = currentDataRaw ? JSON.parse(currentDataRaw) : {};
    // 更新数据
    currentData.code = code; // 更新验证码
    currentData.count = (currentData.count || 0) + 1; // 更新发送次数
    currentData.time = formatDateTime(new Date()); // 更新最后发送时间

    // 存储更新后的数据，设置有效期 10 分钟
    await this.redisService.set(emailKey, JSON.stringify(currentData), 600);
  }

  // 检查是否可以发送邮件
  private async canSendEmail(email: string): Promise<boolean> {
    // 检查是否达到每分钟发送限制，例如每分钟最多发送1次
    // 检查是否达到每日发送限制，例如每天最多发送5次
    return true;
  }

  // 使用模板发送验证码到指定邮箱
  async sendEmailCode(email: string): Promise<void> {
    const code = this.generateVerificationCode();
    const date = formatDateTime(new Date());
    if (this.canSendEmail) {
      throw new ApiException(
        '发送频率过高，请稍后再试',
        ApiCode.BUSINESS_ERROR,
        200,
      );
    }

    try {
      await this.mailerService.sendMail({
        to: email,
        subject: '用户邮箱验证',
        template: 'verify-code.ejs',
        context: {
          code: code,
          date: date,
        },
      });
      await this.storeEmailCode(email, code);
    } catch (error) {
      throw new ApiException(error, ApiCode.BUSINESS_ERROR, 200);
    }
  }
}
