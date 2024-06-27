import { HttpStatus, Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';
import { RedisService } from '../redis/redis.service';
import { ApiException } from '~/constants/exception/api.exception';
import { ApiCode } from '~/constants/enums/api-code.enums';
import { formatDateTime, parseDateTime } from '~/utils/timeformat.util';
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
  // 校验邮箱验证码
  async verifyEmailCode(emailKey: string, emailCode: string): Promise<void> {
    let currentDataRaw = await this.redisService.get(emailKey);
    const currentData = currentDataRaw ? JSON.parse(currentDataRaw) : {};

    if (Object.keys(currentData).length === 0) {
      throw new ApiException(
        '验证码不存在，请重新发送',
        ApiCode.NOT_FOUND,
        HttpStatus.CONFLICT,
      );
    }
    const now = new Date();
    const codeTime = parseDateTime(currentData.time);
    const timeDiff = now.getTime() - codeTime.getTime();

    if (timeDiff > 600000) {
      throw new ApiException(
        '验证码已过期',
        ApiCode.TIMEOUT,
        HttpStatus.CONFLICT,
      );
    }
    if (currentData.code !== emailCode) {
      throw new ApiException(
        '邮箱验证码错误',
        ApiCode.PARAMS_ERROR,
        HttpStatus.CONFLICT,
      );
    }
  }
  // 存储验证码到Redis中，并记录发送次数和时间
  private async storeEmailCode(
    emailKey: string,
    currentData: any,
    code: string,
    date: Date,
    tomorrow: Date,
  ): Promise<void> {
    // 更新redis数据
    currentData.code = code;
    currentData.count = (currentData.count || 0) + 1;
    currentData.time = formatDateTime(new Date());

    const secondsUntilMidnight = (tomorrow.getTime() - date.getTime()) / 1000;

    // 存储更新后的数据，设置有效期持续到零点
    await this.redisService.setEx(
      emailKey,
      JSON.stringify(currentData),
      secondsUntilMidnight,
    );
  }

  // 检查是否可以发送邮件
  private async canSendEmail(
    currentData: any,
    date: Date,
    tomorrow: Date,
  ): Promise<void> {
    if (Object.keys(currentData).length === 0) {
      return;
    }
    const lastSendTime = parseDateTime(currentData.time);
    const difference = date.getTime() - lastSendTime.getTime();

    // 检查是否达到每分钟发送限制，每分钟最多发送1次
    if (60000 > difference) {
      throw new ApiException(
        '发送频率过高，请稍后再试',
        ApiCode.TIMEOUT,
        HttpStatus.TOO_MANY_REQUESTS,
      );
    }
    // 检查是否达到每日发送限制，每天最多发送5次
    if (lastSendTime < tomorrow && currentData.count > 5) {
      throw new ApiException(
        '今日发送次数已达上限',
        ApiCode.BUSINESS_ERROR,
        HttpStatus.FORBIDDEN,
      );
    }
  }

  // 使用模板发送验证码到指定邮箱
  async sendEmailCode(email: string, purpose: string): Promise<void> {
    const code = this.generateVerificationCode();
    //当前时间
    const dateStr = formatDateTime(new Date());
    const now = parseDateTime(dateStr);
    //明天零点
    const tomorrow = new Date(now);
    tomorrow.setDate(tomorrow.getDate() + 1);
    tomorrow.setHours(0, 0, 0, 0);
    const emailKey = `emailCode:${purpose}:${email}`;
    // key-value
    const currentDataRaw = await this.redisService.get(emailKey);
    let currentData = currentDataRaw ? JSON.parse(currentDataRaw) : {};
    await this.canSendEmail(currentData, now, tomorrow);
    try {
      await this.mailerService.sendMail({
        to: email,
        subject: '用户邮箱验证',
        template: 'verify-code.ejs',
        context: {
          code: code,
          date: dateStr,
        },
      });
      await this.storeEmailCode(emailKey, currentData, code, now, tomorrow);
    } catch (error) {
      throw new ApiException(
        error,
        ApiCode.BUSINESS_ERROR,
        HttpStatus.CONFLICT,
      );
    }
  }
}
