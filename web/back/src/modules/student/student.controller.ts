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
import { StudentService } from './student.service';
import { EmailService } from '~/shared/mailer/email.service';
import { ApiBody, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
@ApiTags('student')
@Controller('users')
export class StudentController {
  constructor(private studentService: StudentService) {}
  // 注册新用户
  @ApiBody({
    description: '用户注册提交的信息',
    type: 'object',
    schema: {
      properties: {
        email: { type: 'string', example: '2959346375@qq.com' },
        studentId: { type: 'string', example: '1520223609' },
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
  @ApiBody({
    description: '发送邮箱验证码',
    type: 'object',
    schema: {
      properties: {
        email: { type: 'string', example: '2959346375@qq.com' },
      },
    },
  })
  @Post('email')
  async sendEmailCode(@Body() email: string) {
    return await this.studentService.sendEmailCode(email);
  }
}
