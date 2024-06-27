import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BodyEntity } from './body.entity';
import { BodySystemEntity } from './body-system.entity';
import { StatusSystemEntity } from './status-system.entity';
import { StatusPrivateEntity } from './status-private.entity';
import { BodyPrivateEntity } from './body-private.entity';
import { ApiCode } from '~/constants/enums/api-code.enums';
import { ApiException } from '~/constants/exception/api.exception';
import { formatDateTime } from '~/utils/timeformat.util';
import { log } from 'console';
@Injectable()
export class MessageService {
  constructor(
    @InjectRepository(BodyEntity)
    private readonly bodyRepository: Repository<BodyEntity>,
    @InjectRepository(BodySystemEntity)
    private readonly bodySystemRepository: Repository<BodySystemEntity>,
    @InjectRepository(StatusSystemEntity)
    private readonly statusSystemRepository: Repository<StatusSystemEntity>,
    @InjectRepository(BodyPrivateEntity)
    private readonly bodyPrivateRepository: Repository<BodyPrivateEntity>,
    @InjectRepository(StatusPrivateEntity)
    private readonly statusPrivateRepository: Repository<StatusPrivateEntity>,
  ) {}
  async getSystemMessage(uid: string): Promise<any> {
    // 首先在BodySystemRepository中查找指定uid的记录
    let bodySystemRecord = await this.bodySystemRepository.findOne({
      where: { user_uid: uid },
    });
    // 如果没有找到，则新增一条记录
    if (!bodySystemRecord) {
      bodySystemRecord = this.bodySystemRepository.create({ user_uid: uid });
      await this.bodySystemRepository.save(bodySystemRecord);
    }
    // 然后从bodyRepository中找出对应event和type的所有记录
    const messages = await this.bodyRepository.find({
      where: { type: 0 },
    });
    return messages;
  }
  async createSystemMessage(
    event: string,
    type: number,
    title: string,
    content: string,
  ): Promise<any> {
    // 创建一个新的消息实体
    const message = this.bodyRepository.create({
      event,
      type,
      title,
      content,
    });
    try {
      await this.bodyRepository.save(message);
    } catch (error) {
      throw new ApiException(error, ApiCode.BUSINESS_ERROR, 400);
    }
  }
  async updateStatusSystem(uid: string): Promise<any> {
    let statusSystemRecord = await this.statusSystemRepository.findOne({
      where: { user_uid: uid },
    });
    const currentTime = new Date();
    if (!statusSystemRecord) {
      statusSystemRecord = this.statusSystemRepository.create({
        user_uid: uid,
        last_read_time: currentTime,
      });
      await this.statusSystemRepository.save(statusSystemRecord);
    } else {
      statusSystemRecord.last_read_time = currentTime;
      await this.statusSystemRepository.save(statusSystemRecord);
    }
  }
  async updateStatusPrivate(
    sender_uid: string,
    receiver_uid: string,
  ): Promise<any> {
    let statusPrivateRecord = await this.statusPrivateRepository.findOne({
      where: { sender_uid, receiver_uid },
    });
    const currentTime = new Date();
    if (!statusPrivateRecord) {
      statusPrivateRecord = this.statusPrivateRepository.create({
        sender_uid,
        receiver_uid,
        last_read_time: currentTime,
      });
      await this.statusPrivateRepository.save(statusPrivateRecord);
    } else {
      statusPrivateRecord.last_read_time = currentTime;
      await this.statusPrivateRepository.save(statusPrivateRecord);
    }
  }
  async getPrivateMessage(receiver_uid: string): Promise<any> {
    // 先找找出当前用户是否有私人消息
    const msg_ids = await this.bodyPrivateRepository.find({
      select: ['msg_id', 'sender_uid'],
      where: { receiver_uid },
    });
    if (!msg_ids) {
      return null;
    }
    // 找出当前用户的所有的私人消息
    const messages = await Promise.all(
      msg_ids.map(async (msg) => {
        const message = await this.bodyRepository.findOne({
          where: { id: msg.msg_id },
        });
        return message ? { ...message, sender_uid: msg.sender_uid } : null;
      }),
    );
    // 将所有消息按照发送人进行分组，返回格式为
    const groupedMessages = messages.reduce((acc, message) => {
      (acc[message.sender_uid] = acc[message.sender_uid] || []).push(message);
      return acc;
    }, {});

    return groupedMessages;
  }
  async createPrivateMessage(
    sender_uid: string,
    receiver_uid: string,
    event: string,
    type: number,
    title: string,
    content: string,
  ): Promise<any> {
    // 首先存储在bodyRepository总消息中
    const message = await this.bodyRepository.save({
      event,
      type,
      title,
      content,
    });
    // 检查消息是否成功插入并获取消息ID
    if (!message || !message.id) {
      throw new ApiException('私人消息创建失败', ApiCode.BUSINESS_ERROR, 400);
    }
    //  使用得到的消息ID，在bodyPrivateRepository插入发送者和接收者的关系
    const privateMessage = await this.bodyPrivateRepository.save({
      msg_id: message.id,
      sender_uid,
      receiver_uid,
    });

    // 检查私人消息关系是否成功创建
    if (!privateMessage) {
      throw new ApiException(
        '私人消息关系创建失败',
        ApiCode.BUSINESS_ERROR,
        400,
      );
    }
  }
}
