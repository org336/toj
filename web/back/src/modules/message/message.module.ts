import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MessageService } from './message.service';
import { MessageController } from './message.controller';
import { BodyEntity } from './body.entity';
import { BodySystemEntity } from './body.entity';
import { StatusSystemEntity } from './status.entity';
import { BodyPrivateEntity } from './body.entity';
import { StatusPrivateEntity } from './status.entity';
import { UserEntity } from '../user/user.entity';
@Module({
  controllers: [MessageController],
  providers: [MessageService],
  imports: [
    TypeOrmModule.forFeature([
      UserEntity,
      BodyEntity,
      BodySystemEntity,
      StatusSystemEntity,
      BodyPrivateEntity,
      StatusPrivateEntity,
    ]),
  ],
  exports: [MessageService],
})
export class MessageModule {}
