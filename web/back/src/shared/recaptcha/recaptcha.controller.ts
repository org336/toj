import { Controller, Post, Body } from '@nestjs/common';
import { RecaptchaService } from './recaptcha.service';
import { ApiBody, ApiTags } from '@nestjs/swagger';
@Controller('users')
export class RecaptchaController {
  constructor(private readonly recaptchaService: RecaptchaService) {}
  @ApiBody({
    description: '用户人机校验',
    type: 'object',
    schema: {
      properties: {
        token: { type: 'string', example: '' },
      },
    },
  })
  @Post('validate')
  async validate(@Body('token') token: string): Promise<boolean> {
    const isValid = await this.recaptchaService.validateToken(token);
    return isValid;
  }
}
