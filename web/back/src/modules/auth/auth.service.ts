import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ApiCode } from '~/constants/enums/api-code.enums';
import { ApiException } from '~/constants/exception/api.exception';
import { HttpStatus } from '@nestjs/common';
import { BcryptUtils } from '~/utils/encrypt.util';
import { UserService } from '../user/user.service';
@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async validate(credentials: {
    email: string;
    password: string;
  }): Promise<any> {
    const user = await this.userService.findOneByEmail(credentials.email);
    if (!user) {
      throw new ApiException(
        '找不到该用户',
        ApiCode.NOT_FOUND,
        HttpStatus.UNAUTHORIZED,
      );
    }
    const isMatch = await BcryptUtils.comparePassword(
      credentials.password,
      user.password,
    );
    if (!isMatch) {
      throw new ApiException(
        '密码错误',
        ApiCode.PARAMS_ERROR,
        HttpStatus.UNAUTHORIZED,
      );
    }
    const payload = { uid: user.uid };
    return await this.jwtService.signAsync(payload);
  }
}
