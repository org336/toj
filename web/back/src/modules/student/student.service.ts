import {
  NotFoundException,
  BadRequestException,
  HttpStatus,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { StudentEntity } from './student.entity';
import { BcryptUtils } from '~/utils/encrypt.util';
import { v1 as uuidv1 } from 'uuid';
import { ApiCode } from '~/constants/enums/api-code.enums';
import { ApiException } from '~/constants/exception/api.exception';
import { EmailService } from '~/shared/mailer/email.service';
export class StudentService {
  constructor(
    @InjectRepository(StudentEntity)
    private readonly studentRepository: Repository<StudentEntity>,
    private readonly emailService: EmailService,
  ) {}
  async findOne(email: string) {
    const user = await this.studentRepository.findOne({
      where: { email },
    });
    if (!user)
      throw new ApiException(
        '找不到该用户',
        ApiCode.NOT_FOUND,
        HttpStatus.NOT_FOUND,
      );
    return user;
  }
  async register(student: {
    email: string;
    studentId: string;
    password: string;
  }): Promise<{ uid: string; email: string }> {
    const existingStudent = await this.studentRepository.findOne({
      where: { email: student.email },
    });

    if (existingStudent) {
      throw new ApiException(
        '邮箱已被使用',
        ApiCode.PARAMS_ERROR,
        HttpStatus.CONFLICT,
      );
    }
    const uid = uuidv1();
    student.password = await BcryptUtils.hashPassword(student.password);
    const newStudent = this.studentRepository.create({ ...student, uid });
    await this.studentRepository.save(newStudent);
    return { uid, email: student.email };
  }

  async changePassword(data: {
    email: string;
    code: string;
    newPassword: string;
  }) {
    // Here you would verify the code from your database or cache
    // Assuming a simple mock verification for the sake of example
    const codeValid = data.code === '123456'; // This should be replaced with actual code validation
    if (!codeValid) {
      throw new ApiException(
        '邮箱验证码错误',
        ApiCode.PARAMS_ERROR,
        HttpStatus.CONFLICT,
      );
    }

    const student = await this.studentRepository.findOne({
      where: { email: data.email },
    });
    if (!student) {
      throw new ApiException(
        '用户不存在',
        ApiCode.NOT_FOUND,
        HttpStatus.CONFLICT,
      );
    }
    student.password = await BcryptUtils.hashPassword(data.newPassword);
    return await this.studentRepository.save(student);
  }
  async sendEmailCode(email: string) {
    return this.emailService.sendEmailCode(email);
  }
}
