import { Module } from '@nestjs/common';
import { SocketService } from './socket.service';
import { SocketGateway } from './socket.gateway';
import { MessageModule } from '../message/message.module';

@Module({
  imports: [MessageModule],
  providers: [SocketService, SocketGateway],
})
export class SocketModule {}
