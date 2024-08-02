import { Injectable } from '@nestjs/common';
import RandomUtil from '~/utils/random.util';
import * as fs from 'fs';
import * as path from 'path';
import { HttpStatus } from '@nestjs/common';
import { ApiCode } from '~/constants/enums/api-code.enums';
import { ApiException } from '~/constants/exception/api.exception';
import { UserService } from '~/modules/user/user.service';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AuthenticationEntity } from './authentication.entity';
@Injectable()
export class UploaderService {
  constructor(
    @InjectRepository(AuthenticationEntity)
    private readonly authenticationRepository: Repository<AuthenticationEntity>,
    private readonly userService: UserService,
  ) {}
  private readonly avatarPath = path.join(
    __dirname,
    '..',
    '..',
    'public',
    'avatars',
  );
  private readonly identityPath = path.join(
    __dirname,
    '..',
    '..',
    'public',
    'identities',
  );
  private readonly avatarLength = 24;
  private readonly identityLength = 24;
  async uploadAvatar(file: Express.Multer.File, uid: string): Promise<any> {
    if (!file) {
      throw new ApiException(
        '文件为空，请重新上传',
        ApiCode.NOT_FOUND,
        HttpStatus.NOT_FOUND,
      );
    }
    //检查文件夹是否存在
    if (!fs.existsSync(this.avatarPath)) {
      fs.mkdirSync(this.avatarPath, { recursive: true });
    }
    const fileExtension = file.originalname.split('.').pop();
    const fileName = RandomUtil.generateRandomFileName(
      this.avatarLength,
      fileExtension,
    );
    const filePath = path.join(this.avatarPath, fileName);
    try {
      await fs.promises.writeFile(filePath, file.buffer);
      // 更新用户头像URL，返回旧的URL，删除原来的资源
      const oldAvatarUrl = await this.userService.updateAvatarUrl(
        uid,
        fileName,
      );

      if (oldAvatarUrl) {
        // 拼接完整的服务器路径
        let oldAvatarPath = path.join(this.avatarPath, oldAvatarUrl);
        // 删除服务器旧的头像资源
        await fs.promises.unlink(oldAvatarPath);
      }
    } catch (error) {
      throw new ApiException(
        `上传头像失败:${error.message}`,
        ApiCode.SERVER_ERROR,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
  async uploadIdentity(
    data: {
      realName: string;
      identity: string;
      userId: string;
      imageUrl: string;
    },
    uid: string,
  ): Promise<any> {
    //匹配base64的前缀文件类型data:image/xxx;base64
    const matches = data.imageUrl.match(/^data:image\/(\w+);base64,/);
    if (!matches) {
      throw new ApiException(
        '无效的图片数据',
        ApiCode.PARAMS_ERROR,
        HttpStatus.BAD_REQUEST,
      );
    }
    // 将图片从 Base64 解码
    const base64Data = data.imageUrl.replace(/^data:image\/\w+;base64,/, '');
    const imgBuffer = Buffer.from(base64Data, 'base64');
    //检查文件夹是否存在
    if (!fs.existsSync(this.identityPath)) {
      fs.mkdirSync(this.identityPath, { recursive: true });
    }
    const fileExtension = matches[1];
    const fileName = RandomUtil.generateRandomFileName(
      this.identityLength,
      fileExtension,
    );
    const filePath = path.join(this.identityPath, fileName);
    let identityMapping = {
      student: 1,
      teacher: 2,
    };
    try {
      await fs.promises.writeFile(filePath, imgBuffer);
      const authentication = new AuthenticationEntity();
      authentication.uid = uid;
      authentication.userId = data.userId;
      authentication.realName = data.realName;
      authentication.identity = identityMapping[data.identity];
      authentication.imgUrl = fileName;
      await this.authenticationRepository.save(authentication);
    } catch (error) {
      throw new ApiException(
        `上传身份信息失败:${error.message}`,
        ApiCode.SERVER_ERROR,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
