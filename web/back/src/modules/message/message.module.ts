import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MessageService } from './message.service';
import { MessageController } from './message.controller';
import { BodyEntity } from './body.entity';
import { BodySystemEntity } from './body-system.entity';
import { StatusSystemEntity } from './status-system.entity';
import { BodyPrivateEntity } from './body-private.entity';
import { StatusPrivateEntity } from './status-private.entity';
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
