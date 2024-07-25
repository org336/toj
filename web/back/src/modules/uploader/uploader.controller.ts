import {
  Controller,
  Post,
  UseInterceptors,
  UploadedFiles,
  UploadedFile,
  Query,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { Express } from 'express';
import { UploaderService } from './uploader.service';
@Controller('uploader')
export class UploaderController {
  constructor(private readonly uploadService: UploaderService) {}
  @Post('avatar')
  @UseInterceptors(FileInterceptor('file'))
  async uploadAvatar(
    @UploadedFile() file: Express.Multer.File,
    @Query('uid') uid: string,
  ) {
    return this.uploadService.uploadAvatar(file, uid);
  }
}
