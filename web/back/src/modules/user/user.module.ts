import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StudentController } from './user.controller';
import { UserService } from './user.service';
import { UserEntity } from './user.entity';
import { EmailModule } from '~/shared/mailer/email.module';
@Module({
  controllers: [StudentController],
  providers: [UserService],
  imports: [TypeOrmModule.forFeature([UserEntity]), EmailModule],
  exports: [UserService],
})
export class StudentModule {}
