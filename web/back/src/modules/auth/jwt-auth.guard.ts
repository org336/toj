import {
  HttpStatus,
  CanActivate,
  ExecutionContext,
  Injectable,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Reflector } from '@nestjs/core';
import { Request } from 'express';
import { ConfigService } from '@nestjs/config';
import { ApiException } from '~/constants/exception/api.exception';
import { ApiCode } from '~/constants/enums/api-code.enums';
import { IS_PUBLIC_ROUTE } from '~/common/decorators/common.decorator';
@Injectable()
export class JwtAuthGuard implements CanActivate {
  constructor(
    private configService: ConfigService,
    private jwtService: JwtService,
    private reflector: Reflector,
  ) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    //对于公共路由无需校验jwt
    const isPublic = this.reflector.getAllAndOverride<boolean>(
      IS_PUBLIC_ROUTE,
      [context.getHandler(), context.getClass()],
    );
    if (isPublic) {
      return true;
    }
    const request = context.switchToHttp().getRequest();
    const token = this.extractTokenFromHeader(request);
    if (!token) {
      throw new ApiException(
        '缺少jwtoken',
        ApiCode.TOKEN_INVALID,
        HttpStatus.UNAUTHORIZED,
      );
    }
    try {
      const payload = await this.jwtService.verifyAsync(token, {
        secret: this.configService.get('JWT_SECRET'),
      });
    } catch {
      throw new ApiException(
        'jwtoken验证失败',
        ApiCode.TOKEN_INVALID,
        HttpStatus.UNAUTHORIZED,
      );
    }
    return true;
  }
  //提取请求头中cookie字段的key
  private extractTokenFromHeader(request: Request): string | undefined {
    const token = request.cookies['JWTOKEN'];
    return token;
  }
}
