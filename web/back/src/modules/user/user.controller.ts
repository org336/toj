import {
  UseGuards,
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
} from '@nestjs/common';
import { UserService } from './user.service';
import { ProfileDto } from './profile.dto';
import { ApiBody, ApiTags } from '@nestjs/swagger';
import { Public } from '~/common/decorators/common.decorator';
import { RecaptchaService } from '~/shared/recaptcha/recaptcha.service';
@ApiTags('user')
@Controller('users')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly recaptchaService: RecaptchaService,
  ) {}

  // 注册新用户
  @ApiBody({
    description: '用户注册提交的信息',
    type: 'object',
    schema: {
      properties: {
        email: { type: 'string', example: '2959346375@qq.com' },
        emailCode: { type: 'string', example: '123456' },
        userId: { type: 'string', example: '1520223609' },
        password: { type: 'string', example: 'test123456!' },
      },
    },
  })
  @Public()
  @Post('member')
  async register(
    @Body()
    user: {
      email: string;
      emailCode: string;
      userId: string;
      password: string;
    },
  ) {
    return await this.userService.register(user);
  }
  // 修改用户密码
  @ApiBody({
    description: '修改密码样例',
    type: 'object',
    schema: {
      properties: {
        email: { type: 'string', example: '2959346375@qq.com' },
        emailCode: { type: 'string', example: '123456' },
        newPassword: { type: 'string', example: 'test123456~' },
      },
    },
  })
  @Public()
  @Put('password')
  async changePassword(
    @Body() data: { email: string; emailCode: string; newPassword: string },
  ) {
    return await this.userService.changePassword(data);
  }
  // 发送邮箱验证码
  @ApiBody({
    description: '发送邮箱验证码',
    type: 'object',
    schema: {
      properties: {
        email: { type: 'string', example: '2959346375@qq.com' },
        purpose: { type: 'string', example: 'register/resetPwd' },
      },
    },
  })
  @Public()
  @Post('email')
  async sendEmailCode(@Body() data: { email: string; purpose: string }) {
    return await this.userService.sendEmailCode(data.email, data.purpose);
  }
  @ApiBody({
    description: '获取用户信息',
    type: 'object',
    schema: {
      properties: {
        uid: {
          type: 'string',
          example: '65278040-2d17-11ef-bcf8-41298d1831e7',
        },
      },
    },
  })
  @ApiBody({
    description: '用户人机校验',
    type: 'object',
    schema: {
      properties: {
        token: { type: 'string', example: '' },
      },
    },
  })
  @Public()
  @Post('recaptcha')
  async validate(@Body('token') token: string): Promise<boolean> {
    return await this.recaptchaService.validateToken(token);
  }
  @Post('profile')
  async getProfile(@Body() data: { uid: string }) {
    return await this.userService.getProfile(data.uid);
  }
  @ApiBody({
    description: '更新用户信息',
    type: 'object',
    schema: {
      properties: {
        uid: {
          type: 'string',
          example: '65278040-2d17-11ef-bcf8-41298d1831e7',
        },
        nickName: { type: 'string', example: '小炎子' },
        realName: { type: 'string', example: '萧炎' },
        userId: { type: 'string', example: '1520223609' },
        email: { type: 'string', example: '2959346375@qq.com' },
        signature: {
          type: 'string',
          example: '三十年河东，三十线河西，莫欺少年穷!!!',
        },
        identity: { type: 'number', example: 0 },
        avatarUrl: {
          type: 'string',
          example: '',
        },
      },
    },
  })
  @Put('profile')
  async updateProfile(
    @Body()
    data: {
      uid: string;
      nickName: string;
      realName: string;
      userId: string;
      email: string;
      signature: string;
      avatarUrl: string;
    },
  ) {
    return await this.userService.updateProfile(data);
  }
}
