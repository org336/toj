import { Module } from '@nestjs/common';
import { RecaptchaService } from './recaptcha.service';
import { AxiosModule } from '../axios/axios.module';

@Module({
  imports: [AxiosModule],
  providers: [RecaptchaService],
  exports: [RecaptchaService],
})
export class RecaptchaModule {}
