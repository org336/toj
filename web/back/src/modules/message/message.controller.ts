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
import { MessageService } from './message.service';
import { ApiBody, ApiTags, ApiQuery } from '@nestjs/swagger';
@ApiTags('message')
@Controller('messages')
export class MessageController {
  constructor(private readonly messageService: MessageService) {}

  @ApiQuery({
    name: 'uid',
    type: String,
    description: '用户ID',
    example: '65278040-2d17-11ef-bcf8-41298d1831e7',
  })
  @Get('system')
  async getSystemMessages(@Query('uid') uid: string) {
    return await this.messageService.getSystemMessage(uid);
  }
  @ApiBody({
    description: '新建系统消息',
    type: 'object',
    schema: {
      required: ['event', 'type', 'title', 'content'],
      properties: {
        event: {
          type: 'string',
          example: 'notice',
        },
        type: {
          type: 'number',
          example: 0,
        },
        title: {
          type: 'string',
          example: '新消息',
        },
        content: {
          type: 'string',
          example: '你好，这是一条系统消息。',
        },
      },
    },
  })
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
  @ApiBody({
    description: '更新用户系统消息的状态',
    type: 'object',
    schema: {
      properties: {
        uid: {
          type: 'string',
          example: '65278040-2d17-11ef-bcf8-41298d1831e7',
        },
      },
    },
  })
  @Post('system/status')
  async updateStatusSystem(
    @Body()
    data: {
      uid: string;
    },
  ) {
    return await this.messageService.updateStatusSystem(data.uid);
  }
  @ApiQuery({
    name: 'uid',
    type: String,
    description: '用户ID',
    example: '65278040-2d17-11ef-bcf8-41298d1831e7',
  })
  @Get('private')
  async getPrivateMessages(@Query('uid') uid: string) {
    return await this.messageService.getPrivateMessage(uid);
  }
  @ApiBody({
    description: '创建私人系统消息',
    type: 'object',
    schema: {
      properties: {
        sender_uid: {
          type: 'string',
          example: '65278040-2d17-11ef-bcf8-41298d1831e7',
        },
        receiver_uid: {
          type: 'string',
          example: '65278040-2d17-11ef-bcf8-41298d1831e7',
        },
        event: {
          type: 'string',
          example: 'talk',
        },
        type: {
          type: 'number',
          example: 1,
        },
        title: {
          type: 'string',
          example: '新消息',
        },
        content: {
          type: 'string',
          example: '你好，这是一条私人消息。',
        },
      },
    },
  })
  @Post('private')
  async createPrivateMessage(
    @Body()
    data: {
      sender_uid: string;
      receiver_uid: string;
      event: string;
      type: number;
      title: string;
      content: string;
    },
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
  @ApiBody({
    description: '更新用户私人消息的状态',
    type: 'object',
    schema: {
      properties: {
        sender_uid: {
          type: 'string',
          example: 'xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx',
        },
        recevier_uid: {
          type: 'string',
          example: 'xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx',
        },
      },
    },
  })
  @Post('private/status')
  async updateStatusPrivate(
    @Body() data: { sender_uid: string; recevier_uid: string },
  ) {
    return await this.messageService.updateStatusPrivate(
      data.sender_uid,
      data.recevier_uid,
    );
  }
  @Get('reply')
  getReplies() {
    // 处理获取回复消息的逻辑
  }
}
