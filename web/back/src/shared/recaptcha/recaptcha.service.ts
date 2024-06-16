import { Injectable, HttpStatus } from '@nestjs/common';
import axios from 'axios';
import { ConfigService } from '@nestjs/config';
import { ApiCode } from '~/constants/enums/api-code.enums';
import { ApiException } from '~/constants/exception/api.exception';
@Injectable()
export class RecaptchaService {
  private readonly recaptchaSecret: string;

  constructor(private configService: ConfigService) {
    this.recaptchaSecret = this.configService.get<string>('RECAPTCHA_SECRET');
  }

  async validateToken(token: string): Promise<boolean> {
    const response = await axios.post(
      `https://www.google.com/recaptcha/api/siteverify`,
      {},
      {
        params: {
          secret: this.recaptchaSecret,
          response: token,
        },
      },
    );

    const data = response.data;
    if (!data.success) {
      throw new ApiException(
        '无效token',
        ApiCode.TOKEN_INVALID,
        HttpStatus.BAD_REQUEST,
      );
    }
    return true;
  }
}
