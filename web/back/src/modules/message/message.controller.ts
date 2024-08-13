import { Controller, Get, Post, Body, Query, Param, Put, Delete } from '@nestjs/common';
import { PrivateMessage } from '~/constants/interface/common.interface';
import { MessageService } from './message.service';
@Controller('messages')
export class MessageController {
  constructor(private readonly messageService: MessageService) {}
  @Get('system')
  async getSystemMessages(@Query() query: { uid: string; identity: number }) {
    const { uid, identity } = query;
    return await this.messageService.getSystemMessage(uid, identity);
  }

  @Post('system')
  async createSystemMessage(
    @Query() query: { face: number; uid: string },
    @Body()
    data: {
      event: string;
      type: number;
      title: string;
      content: string;
    },
  ) {
    return await this.messageService.createSystemMessage(query, data);
  }

  @Post('system/status')
  async updateStatusSystem(
    @Body()
    data: {
      uid: string;
    },
  ) {
    return await this.messageService.updateStatusSystem(data.uid);
  }
  @Get('private')
  async getAllPrivateMessages(@Query('uid') uid: string) {
    return await this.messageService.getAllPrivateMessage(uid);
  }
  @Post('private')
  async createPrivateMessage(
    @Body()
    data: PrivateMessage,
  ) {
    const { sender_uid, receiver_uid, event, type, title, content } = data;
    return await this.messageService.createPrivateMessage(
      sender_uid,
      receiver_uid,
      event,
      type,
      title,
      content,
    );
  }
  @Delete('private')
  async deletePrivateMessage(@Query('id') id: number) {
    await this.messageService.deletePrivateMessage(id);
  }
  @Post('private/status')
  async updateStatusPrivate(@Body() data: { sender_uid: string; recevier_uid: string }) {
    return await this.messageService.updateStatusPrivate(data.sender_uid, data.recevier_uid);
  }
}
