import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, In } from 'typeorm';
import { UserEntity } from '../user/user.entity';
import { BodyEntity } from './body.entity';
import { BodySystemEntity } from './body-system.entity';
import { StatusSystemEntity } from './status-system.entity';
import { StatusPrivateEntity } from './status-private.entity';
import { BodyPrivateEntity } from './body-private.entity';
import { ApiCode } from '~/constants/enums/api-code.enums';
import { ApiException } from '~/constants/exception/api.exception';
import { ProfileDto } from '../user/profile.dto';
import { formatDateTime } from '~/utils/timeformat.util';
@Injectable()
export class MessageService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
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
    // 首先在关系表中查找指定uid的记录
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
      await this.statusSystemRepository.update(
        { id: statusSystemRecord.id },
        { last_read_time: currentTime },
      );
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
      await this.statusPrivateRepository.update(
        { id: statusPrivateRecord.id },
        { last_read_time: currentTime },
      );
    }
  }
  async getPrivateMessage(receiver_uid: string): Promise<any> {
    // 先找出当前用户是否有私人消息
    const queryResult = await this.bodyPrivateRepository.query(
      `
    SELECT 
      sender_uid, 
      GROUP_CONCAT(msg_id ORDER BY msg_id DESC) AS msg_ids
    FROM 
      message_body_private
    WHERE 
      receiver_uid = ?
    GROUP BY 
      sender_uid;
  `,
      [receiver_uid],
    );
    if (!queryResult) {
      throw new ApiException(
        '未找到用户的任何私人消息',
        ApiCode.BUSINESS_ERROR,
        400,
      );
    }
    const result = [];
    for (const item of queryResult) {
      const msgIds = item.msg_ids.split(',');
      // 找出当前用户的所有的私人消息以及发送人信息
      const sender = await this.userRepository.findOne({
        where: { uid: item.sender_uid },
      });
      const messages = await this.bodyRepository.find({
        where: { id: In(msgIds) },
      });

      result.push({
        sender: new ProfileDto(sender),
        messages: messages,
      });
    }
    return result;
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
    //  使用得到的消息ID，在关系表插入发送者和接收者的关系
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
