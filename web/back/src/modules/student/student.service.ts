import { NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { StudentEntity } from './student.entity';
import { BcryptUtils } from '~/utils/encrypt.util';
import * as jwt from 'jsonwebtoken';
import * as nodemailer from 'nodemailer';
import { v1 as uuidv1 } from 'uuid';
import { ApiCode } from '~/constants/enums/api-code.enums';
import { ApiException } from '~/constants/exception/api.exception';
export class StudentService {
  constructor(
    @InjectRepository(StudentEntity)
    private readonly studentRepository: Repository<StudentEntity>,
  ) {}

  async register(student: {
    email: string;
    studentId: string;
    password: string;
  }): Promise<{ uid: string; email: string }> {
    const existingStudent = await this.studentRepository.findOne({
      where: { email: student.email },
    });

    if (existingStudent) {
      throw new ApiException('邮箱已被使用', ApiCode.PARAMS_ERROR, 200);
    }
    const uid = uuidv1();
    student.password = await BcryptUtils.hashPassword(student.password);
    const newStudent = this.studentRepository.create({ ...student, uid });
    return { uid, email: student.email };
  }

  async login(credentials: { email: string; password: string }) {
    const student = await this.studentRepository.findOne({
      where: { email: credentials.email },
    });
    if (!student) {
      throw new ApiException('找不到该用户', ApiCode.SIGN_ERROR, 200);
    }
    const isMatch = await BcryptUtils.comparePassword(
      credentials.password,
      student.password,
    );
    if (!isMatch) {
      throw new ApiException('密码错误', ApiCode.PARAMS_ERROR, 200);
    }
    const payload = { uid: student.uid, email: student.email };
    const token = jwt.sign(payload, 'your_jwt_secret', { expiresIn: '1h' });
    return { token };
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
      throw new BadRequestException('Invalid verification code');
    }

    const student = await this.studentRepository.findOne({
      where: { email: data.email },
    });
    if (!student) {
      throw new NotFoundException('Student not found');
    }
    student.password = await BcryptUtils.hashPassword(data.newPassword);
    return await this.studentRepository.save(student);
  }

  async sendEmailCode(email: string) {
    // 生成一个随机的验证码
    // 存储验证码到数据库或缓存中
    // await this.storeVerificationCode(email, code);
    // 创建一个邮件传输器
    // 设置邮件内容
    // 发送邮件
  }
}
