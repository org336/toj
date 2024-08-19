import { HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DataSource } from 'typeorm';
import { UserEntity } from './user.entity';
import { BcryptUtils } from '~/utils/encrypt.util';
import { v4 as uuid } from 'uuid';
import { ApiCode } from '~/constants/enums/api-code.enums';
import { ApiException } from '~/constants/exception/api.exception';
import { EmailService } from '~/shared/mailer/email.service';
import { ProfileDto } from './user.dto';
import { MessageService } from '../message/message.service';

export class UserService {
  constructor(
    private readonly dataSource: DataSource,
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    private readonly emailService: EmailService,
    private readonly messageService: MessageService,
  ) {}

  async findOneByEmail(email: string) {
    const user = await this.userRepository
      .createQueryBuilder()
      .select()
      .where('email=:email', { email })
      .getOne();
    if (!user)
      throw new ApiException('用户不存在，请先去注册', ApiCode.NOT_FOUND, HttpStatus.NOT_FOUND);
    return user;
  }
  async findOneByUid(uid: string) {
    const user = await this.userRepository
      .createQueryBuilder()
      .select()
      .where('uid=:uid', { uid })
      .getOne();
    if (!user)
      throw new ApiException('用户不存在，请先去注册', ApiCode.NOT_FOUND, HttpStatus.NOT_FOUND);
    return user;
  }
  async findAllByIdentity(identity: number) {
    const result = await this.userRepository
      .createQueryBuilder()
      .select(['uid', 'user_id', 'email', 'real_name'])
      .where('identity=:identity', { identity })
      .getRawMany();
    if (!result) {
      throw new ApiException('未找到身份为学生的用户', ApiCode.NOT_FOUND, HttpStatus.NOT_FOUND);
    }
    return result;
  }
  async updateAvatarUrl(uid: string, avatarUrl: string) {
    const user = await this.findOneByUid(uid);
    let oldAvatarUrl = user.avatarUrl;
    await this.userRepository
      .createQueryBuilder()
      .update()
      .set({ avatarUrl: avatarUrl })
      .where('uid = :uid', { uid })
      .execute();
    return oldAvatarUrl;
  }
  async register(user: {
    email: string;
    emailCode: string;
    userId: string;
    password: string;
  }): Promise<{ uid: string; email: string }> {
    const { email, emailCode, userId, password } = user;
    const isExisting = await this.userRepository
      .createQueryBuilder()
      .where('email=:email', { email })
      .getOne();

    if (isExisting) {
      throw new ApiException('邮箱已被使用', ApiCode.PARAMS_ERROR, HttpStatus.CONFLICT);
    }
    let emailKey = `emailCode:register:${email}`;
    await this.emailService.verifyEmailCode(emailKey, emailCode);
    const uid = uuid();
    const hashPassword = await BcryptUtils.hashPassword(password);
    //事务管理
    await this.dataSource.transaction(async (transactionalEntityManager) => {
      await transactionalEntityManager
        .createQueryBuilder()
        .insert()
        .into(UserEntity)
        .values({
          uid,
          email,
          userId,
          password: hashPassword,
          identity: 0,
        })
        .execute();
      await this.messageService.createStatusSystem(uid);
    });
    return { uid, email };
  }

  async resetPassword(data: {
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
  async updatePassword(data: {
    uid: string;
    oldPassword: string;
    newPassword: string;
  }): Promise<void> {
    const user = await this.findOneByUid(data.uid);
    if (!BcryptUtils.comparePassword(data.oldPassword, user.password)) {
      throw new ApiException('原始密码错误', ApiCode.PARAMS_ERROR, HttpStatus.CONFLICT);
    }
    user.password = await BcryptUtils.hashPassword(data.newPassword);
    await this.userRepository.save(user);
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
      throw new ApiException('更新用户资料失败', ApiCode.PARAMS_ERROR, HttpStatus.BAD_REQUEST);
    }
  }
}
