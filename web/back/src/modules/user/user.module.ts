import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { UserEntity } from './user.entity';
import { EmailModule } from '~/shared/mailer/email.module';
import { RecaptchaModule } from '~/shared/recaptcha/recaptcha.module';
@Module({
  controllers: [UserController],
  providers: [UserService],
  imports: [
    TypeOrmModule.forFeature([UserEntity]),
    EmailModule,
    RecaptchaModule,
  ],
  exports: [UserService],
})
export class UserModule {}
