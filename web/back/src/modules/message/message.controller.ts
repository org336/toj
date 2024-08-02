import {
  UseGuards,
  Controller,
  Get,
  Post,
  Body,
  Query,
  Param,
  Put,
  Delete,
} from '@nestjs/common';
import { PrivateMessage } from '~/constants/interface/common.interface';
import { MessageService } from './message.service';
@Controller('messages')
export class MessageController {
  constructor(private readonly messageService: MessageService) {}

  @Get('system')
  async getSystemMessages(@Query('uid') uid: string) {
    return await this.messageService.getSystemMessage(uid);
  }

  @Post('system')
  async createSystemMessage(
    @Body()
    data: {
      event: string;
      type: number;
      title: string;
      content: string;
    },
  ) {
    const { event, type, title, content } = data;
    return await this.messageService.createSystemMessage(
      event,
      type,
      title,
      content,
    );
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
  @Post('private/status')
  async updateStatusPrivate(
    @Body() data: { sender_uid: string; recevier_uid: string },
  ) {
    return await this.messageService.updateStatusPrivate(
      data.sender_uid,
      data.recevier_uid,
    );
  }
}
