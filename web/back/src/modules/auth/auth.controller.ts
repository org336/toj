import { Body, Controller, Post, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiBody, ApiTags } from '@nestjs/swagger';
import { Response } from 'express';
import { Public } from '~/common/decorators/common.decorator';
@ApiTags('user')
@Controller('users')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  // 经过jwt管理的登录接口
  @ApiBody({
    description: '用户登录接口',
    type: 'object',
    schema: {
      properties: {
        email: { type: 'string', example: '2959346375@qq.com' },
        password: { type: 'string', example: 'test123456!' },
      },
    },
  })
  @Public()
  @Post('session')
  async login(
    @Body() credentials: { email: string; password: string },
    @Res() res: Response,
  ): Promise<any> {
    return await this.authService.validate(credentials, res);
  }
}
