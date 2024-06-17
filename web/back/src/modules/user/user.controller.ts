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
import { ApiBody, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
@ApiTags('user')
@Controller('users')
export class StudentController {
  constructor(private userService: UserService) {}
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
    description: '修改密码的数据',
    type: 'object',
    schema: {
      properties: {
        email: { type: 'string', example: '2959346375@qq.com' },
        emailCode: { type: 'string', example: '123456' },
        newPassword: { type: 'string', example: 'test123456~' },
      },
    },
  })
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
  @Post('email')
  async sendEmailCode(@Body() data: { email: string; purpose: string }) {
    return await this.userService.sendEmailCode(data.email, data.purpose);
  }
}
