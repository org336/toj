import { HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { StudentEntity } from './student.entity';
import { BcryptUtils } from '~/utils/encrypt.util';
import { v1 as uuidv1 } from 'uuid';
import { ApiCode } from '~/constants/enums/api-code.enums';
import { ApiException } from '~/constants/exception/api.exception';
import { EmailService } from '~/shared/mailer/email.service';
import { CommonService } from '~/common/common.service';
export class StudentService {
  constructor(
    @InjectRepository(StudentEntity)
    private readonly studentRepository: Repository<StudentEntity>,
    private readonly emailService: EmailService,
    private readonly commonService: CommonService,
  ) {}
  async findOneByEmail(email: string) {
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
    emailCode: string;
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
    let emailKey = `emailCode:register:${student.email}`;
    await this.commonService.verifyEmailCode(emailKey, student.emailCode);
    const uid = uuidv1();
    student.password = await BcryptUtils.hashPassword(student.password);
    const newStudent = this.studentRepository.create({ ...student, uid });
    await this.studentRepository.save(newStudent);
    return { uid, email: student.email };
  }

  async changePassword(data: {
    email: string;
    emailCode: string;
    newPassword: string;
  }): Promise<void> {
    const student = await this.findOneByEmail(data.email);
    let emailKey = `emailCode:resetPwd:${data.email}`;
    await this.commonService.verifyEmailCode(emailKey, data.emailCode);

    student.password = await BcryptUtils.hashPassword(data.newPassword);
    await this.studentRepository.save(student);
  }
  async sendEmailCode(email: string, func: string) {
    return this.emailService.sendEmailCode(email, func);
  }
}
