import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
} from '@nestjs/common';
import { StudentService } from './student.service';
import { ApiBody, ApiTags } from '@nestjs/swagger';
@ApiTags('student')
@Controller('users')
export class StudentController {
  constructor(private readonly studentService: StudentService) {}

  // 登录
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
  async login(@Body() credentials: { email: string; password: string }) {
    return await this.studentService.login(credentials);
  }
  // 注册新用户
  @ApiBody({
    description: '用户注册提交的信息',
    type: 'object',
    schema: {
      properties: {
        email: { type: 'string', example: '2959346375@qq.com' },
        studentId: { type: 'string', example: '1520221111' },
        password: { type: 'string', example: 'test123456!' },
      },
    },
  })
  @Post('member')
  async register(
    @Body() student: { email: string; studentId: string; password: string },
  ) {
    return await this.studentService.register(student);
  }
  // 修改用户密码
  @ApiBody({
    description: '修改密码的数据',
    type: 'object',
    schema: {
      properties: {
        email: { type: 'string', example: '2959346375@qq.com' },
        code: { type: 'string', example: 'test123456!' },
        newPassword: { type: 'string', example: 'test123456~' },
      },
    },
  })
  @Put('password')
  async changePassword(
    @Body() data: { email: string; code: string; newPassword: string },
  ) {
    return await this.studentService.changePassword(data);
  }
  // 发送邮箱验证码
  @Post('email')
  async sendEmailCode(@Body() email: string) {
    return await this.studentService.sendEmailCode(email);
  }
}
