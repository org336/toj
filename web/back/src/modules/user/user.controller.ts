import {
  UseGuards,
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
  Query,
} from '@nestjs/common';
import { UserService } from './user.service';
import { EmailService } from '~/shared/mailer/email.service';
import { ApiBody, ApiTags } from '@nestjs/swagger';
import { Public } from '~/common/decorators/common.decorator';
import { RecaptchaService } from '~/shared/recaptcha/recaptcha.service';
@ApiTags('user')
@Controller('users')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly recaptchaService: RecaptchaService,
    private readonly emailService: EmailService,
  ) {}

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
  @Public()
  @Put('password-reset')
  async changePassword(
    @Body() data: { email: string; emailCode: string; newPassword: string },
  ) {
    return await this.userService.resetPassword(data);
  }

  @Put('password-update')
  async updatePassword(
    @Body() data: { uid: string; oldPassword: string; newPassword: string },
  ) {
    return await this.userService.updatePassword(data);
  }

  @Public()
  @Post('email')
  async sendEmailCode(@Body() data: { email: string; purpose: string }) {
    return await this.emailService.sendEmailCode(data.email, data.purpose);
  }

  @Public()
  @Post('recaptcha')
  async validate(@Body('token') token: string): Promise<boolean> {
    return await this.recaptchaService.validateToken(token);
  }

  @Post('profile')
  async getProfile(@Body() data: { uid: string }) {
    return await this.userService.getProfile(data.uid);
  }

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
  @Get('all')
  async getAllByIdentity(@Query('identity') identity: number) {
    return await this.userService.findAllByIdentity(identity);
  }
}
