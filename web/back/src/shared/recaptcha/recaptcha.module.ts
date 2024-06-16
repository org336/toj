import { Module } from '@nestjs/common';
import { RecaptchaController } from './recaptcha.controller';
import { RecaptchaService } from './recaptcha.service';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [ConfigModule],
  controllers: [RecaptchaController],
  providers: [RecaptchaService],
})
export class RecaptchaModule {}
