import {
  WebSocketGateway,
  WebSocketServer,
  SubscribeMessage,
  MessageBody,
  OnGatewayInit,
  ConnectedSocket,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { MessageService } from '../message/message.service';
import { SocketService } from './socket.service';
import { ConfigService } from '@nestjs/config';
import { PrivateMessage } from '~/constants/interface/common.interface';

@WebSocketGateway(3036, {
  namespace: '/chatroom',
  cors: {
    origin: '*', // 允许所有来源，生产环境中应设置为特定的域名
    credentials: true,
  },
})
export class SocketGateway implements OnGatewayInit {
  @WebSocketServer()
  server: Server;

  constructor(
    private readonly socketService: SocketService,
    private messageService: MessageService,
    private configService: ConfigService,
  ) {}

  afterInit(server: Server) {
    this.socketService.initialize(server);
    const origin = this.configService.get<string>('CLIENT_ORIGIN');
  }

  @SubscribeMessage('joinChatRoom')
  // 加入聊天室事件
  handleJoinRoom(
    @MessageBody() data: { uid1: string; uid2: string },
    @ConnectedSocket() client: Socket,
  ) {
    const { uid1, uid2 } = data;
    const roomId = createChatRoomId(uid1, uid2);
    client.join(roomId);
    console.log(`用户${uid1}和用户${uid2}加入了聊天室${roomId}`);
  }
  @SubscribeMessage('test')
  handleEvent(@MessageBody() data: string, @ConnectedSocket() client: Socket): string {
    console.log('这是测试数据:', data);
    return data;
  }
  @SubscribeMessage('send')
  async handleSentPrivateMessage(@MessageBody() data: PrivateMessage) {
    console.log('接收到私人消息:', data);
    const { sender_uid, receiver_uid, event, type, title, content } = data;
    // 将新建的私人消息存储到数据库
    await this.messageService.createPrivateMessage(
      sender_uid,
      receiver_uid,
      event,
      type,
      title,
      content,
    );
    const roomId = createChatRoomId(sender_uid, receiver_uid);
    const message = { event, type, title, content };
    // 推送私人消息给对应的接收者
    this.server.to(roomId).emit('receive', message);
    console.log(`Message sent to room: ${roomId}`);
  }
  // 推送某个人的私人消息给对应的接收者
  @SubscribeMessage('get')
  async handleGetPrivateMessage(@MessageBody() data: any, @ConnectedSocket() client: Socket) {
    const { sender_uid, receiver_uid } = data;
    const message = await this.messageService.getPrivateMessage(sender_uid, receiver_uid);
    console.log(`将来自 ${sender_uid}的私人消息发送给${receiver_uid}`);
    // 推送消息给请求者
    return message;
  }
}
function createChatRoomId(uid1: string, uid2: string): string {
  return [uid1, uid2].sort().join('_');
}
