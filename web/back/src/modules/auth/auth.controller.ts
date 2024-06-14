import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiBody, ApiTags } from '@nestjs/swagger';
@ApiTags('user')
@Controller('users')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  // 经过jwt管理的登录接口
  @ApiBody({
    description: '用户登录信息',
    type: 'object',
    schema: {
      properties: {
        email: { type: 'string', example: '2959346375@qq.com' },
        password: { type: 'string', example: 'test123456!' },
      },
    },
  })
  @Post('session')
  signIn(
    @Body() credentials: { email: string; password: string },
  ): Promise<any> {
    return this.authService.validate(credentials);
  }
}
