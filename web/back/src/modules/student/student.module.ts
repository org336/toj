import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StudentController } from './student.controller';
import { StudentService } from './student.service';
import { StudentEntity } from './student.entity';
import { EmailModule } from '~/shared/mailer/email.module';
@Module({
  controllers: [StudentController],
  providers: [StudentService],
  imports: [TypeOrmModule.forFeature([StudentEntity]), EmailModule],
  exports: [StudentService],
})
export class StudentModule {}
