import { Injectable, HttpStatus } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ApiCode } from '~/constants/enums/api-code.enums';
import { ApiException } from '~/constants/exception/api.exception';
import { AxiosService } from '../axios/axios.service';
@Injectable()
export class RecaptchaService {
  private readonly recaptchaSecret: string;
  constructor(
    private readonly configService: ConfigService,
    private readonly axiosService: AxiosService,
  ) {
    this.recaptchaSecret = this.configService.get<string>('RECAPTCHA_SECRET');
  }

  async validateToken(token: string): Promise<boolean> {
    // const data = await this.axiosService.post(
    //   `https://www.google.com/recaptcha/api/siteverify`,
    //   {
    //     secret: this.recaptchaSecret,
    //     response: token,
    //   },
    // );

    // if (!data.success) {
    //   console.log(data['error-codes']?.join(','));
    //   throw new ApiException(
    //     'token验证失败',
    //     ApiCode.TOKEN_INVALID,
    //     HttpStatus.BAD_REQUEST,
    //   );
    // }
    return true;
  }
}
