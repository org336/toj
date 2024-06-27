import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ApiCode } from '~/constants/enums/api-code.enums';
import { ApiException } from '~/constants/exception/api.exception';
import { HttpStatus } from '@nestjs/common';
import { BcryptUtils } from '~/utils/encrypt.util';
import { UserService } from '../user/user.service';
import { Response } from 'express';
@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async validate(
    credentials: {
      email: string;
      password: string;
    },
    res: Response,
  ): Promise<any> {
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

    const payload = {
      uid: user.uid,
    };
    const jwt = await this.jwtService.signAsync(payload);
    // 设置HttpOnly Cookie
    res.cookie('JWTOKEN', jwt, {
      httpOnly: true,
      secure: false, // 开发环境暂时使用HTTP,在生产环境中确保使用HTTPS
      sameSite: 'strict',
      maxAge: 259200000, // 3天有效时间：3 * 24 * 60 * 60 * 1000
    });

    return res.json({
      code: ApiCode.SUCCESS,
      msg: 'success',
      data: { uid: user.uid, identity: user.identity },
    });
  }
}
