import {
  Controller,
  Post,
  UseInterceptors,
  UploadedFiles,
  UploadedFile,
  Query,
  Body,
} from '@nestjs/common';
import { ApiBody, ApiTags, ApiQuery } from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';
import { Express } from 'express';
import { UploaderService } from './uploader.service';
@Controller('uploader')
@ApiTags('uploader')
export class UploaderController {
  constructor(private readonly uploadService: UploaderService) {}
  @ApiBody({
    description: '上传并修改用户头像',
    required: true,
    schema: {
      type: 'object',
      properties: {
        file: {
          type: 'string',
          format: 'binary',
        },
      },
    },
  })
  @ApiQuery({
    name: 'uid',
    type: String,
    description: '用户ID',
    example: '65278040-2d17-11ef-bcf8-41298d1831e7',
  })
  @Post('avatar')
  @UseInterceptors(FileInterceptor('file'))
  async uploadAvatar(
    @UploadedFile() file: Express.Multer.File,
    @Query('uid') uid: string,
  ) {
    return this.uploadService.uploadAvatar(file, uid);
  }
  @ApiBody({
    description: '上传身份认证信息',
    type: 'object',
    schema: {
      type: 'object',
      properties: {
        realName: { type: 'string', example: 'Tom' },
        userId: { type: 'string', example: '1520223609' },
        identity: { type: 'string', example: 'student' },
        imageUrl: { type: 'string', example: 'data:image/jpeg;base64' },
      },
    },
  })
  @Post('authentication')
  async uploadIdentity(
    @Body()
    data: {
      realName: string;
      identity: string;
      userId: string;
      imageUrl: string;
    },
    @Query('uid') uid: string,
  ) {
    return this.uploadService.uploadIdentity(data, uid);
  }
}
