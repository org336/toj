import { Injectable, HttpStatus } from '@nestjs/common';
import { RedisService } from '~/shared/redis/redis.service';
import { ApiCode } from '~/constants/enums/api-code.enums';
import { ApiException } from '~/constants/exception/api.exception';
import { formatDateTime, parseDateTime } from '~/utils/timeformat.util';
@Injectable()
export class CommonService {
  constructor(private readonly redisService: RedisService) {}

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
}
