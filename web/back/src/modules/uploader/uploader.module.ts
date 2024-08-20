import { Module } from '@nestjs/common';
import { UploaderController } from './uploader.controller';
import { UploaderService } from './uploader.service';
import { UserModule } from '../user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthenticationEntity } from './authentication.entity';
@Module({
  controllers: [UploaderController],
  providers: [UploaderService],
  imports: [TypeOrmModule.forFeature([AuthenticationEntity]), UserModule],
  exports: [UploaderModule],
})
export class UploaderModule {}
