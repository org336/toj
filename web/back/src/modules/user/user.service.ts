import { HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Transaction } from 'typeorm';
import { UserEntity } from './user.entity';
import { BcryptUtils } from '~/utils/encrypt.util';
import { v4 as uuid } from 'uuid';
import { ApiCode } from '~/constants/enums/api-code.enums';
import { ApiException } from '~/constants/exception/api.exception';
import { EmailService } from '~/shared/mailer/email.service';
import { CommonService } from '~/common/common.service';
import { ProfileDto } from './profile.dto';
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    private readonly emailService: EmailService,
    private readonly commonService: CommonService,
  ) {}
  async findOneByEmail(email: string) {
    const user = await this.userRepository.findOne({
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
  async findOneByUid(uid: string) {
    const user = await this.userRepository.findOne({
      where: { uid },
    });
    if (!user)
      throw new ApiException(
        '找不到该用户',
        ApiCode.NOT_FOUND,
        HttpStatus.NOT_FOUND,
      );
    return user;
  }

  async register(user: {
    email: string;
    emailCode: string;
    userId: string;
    password: string;
  }): Promise<{ uid: string; email: string }> {
    const existinguser = await this.userRepository.findOne({
      where: { email: user.email },
    });

    if (existinguser) {
      throw new ApiException(
        '邮箱已被使用',
        ApiCode.PARAMS_ERROR,
        HttpStatus.CONFLICT,
      );
    }
    let emailKey = `emailCode:register:${user.email}`;
    await this.emailService.verifyEmailCode(emailKey, user.emailCode);
    const uid = uuid();
    user.password = await BcryptUtils.hashPassword(user.password);
    const newuser = this.userRepository.create({ ...user, uid });
    await this.userRepository.save(newuser);
    return { uid, email: user.email };
  }

  async changePassword(data: {
    email: string;
    emailCode: string;
    newPassword: string;
  }): Promise<void> {
    const user = await this.findOneByEmail(data.email);
    let emailKey = `emailCode:resetPwd:${data.email}`;

    await this.emailService.verifyEmailCode(emailKey, data.emailCode);

    user.password = await BcryptUtils.hashPassword(data.newPassword);
    await this.userRepository.save(user);
  }
  async sendEmailCode(email: string, func: string) {
    return this.emailService.sendEmailCode(email, func);
  }
  async getProfile(uid: string) {
    const user = await this.findOneByUid(uid);
    return new ProfileDto(user);
  }
  async updateProfile(data: {
    uid: string;
    nickName: string;
    realName: string;
    userId: string;
    email: string;
    signature: string;
    avatarUrl: string;
  }) {
    const user = await this.findOneByUid(data.uid);
    // 更新用户资料
    try {
      user.nickName = data.nickName;
      user.realName = data.realName;
      user.userId = data.userId;
      user.email = data.email;
      user.signature = data.signature;
      const updateResult = await this.userRepository.save(user);
      return new ProfileDto(updateResult);
    } catch (error) {
      throw new ApiException(
        '更新用户资料失败',
        ApiCode.PARAMS_ERROR,
        HttpStatus.BAD_REQUEST,
      );
    }
  }
}
