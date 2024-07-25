import { Module } from '@nestjs/common';
import { UploaderController } from './uploader.controller';
import { UploaderService } from './uploader.service';
import { UserModule } from '../user/user.module';
@Module({
  imports: [UserModule],
  controllers: [UploaderController],
  providers: [UploaderService],
  exports: [UploaderModule],
})
export class UploaderModule {}
