import { Injectable } from '@nestjs/common';
import RandomUtil from '~/utils/random.util';
import * as fs from 'fs';
import * as path from 'path';
import { HttpStatus } from '@nestjs/common';
import { ApiCode } from '~/constants/enums/api-code.enums';
import { ApiException } from '~/constants/exception/api.exception';
import { UserService } from '~/modules/user/user.service';
import { log } from 'console';
@Injectable()
export class UploaderService {
  constructor(private userService: UserService) {}
  private readonly avatarPath = path.join(
    __dirname,
    '..',
    '..',
    'public',
    'avatars',
  );
  private readonly avatarLength = 24;
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
}
