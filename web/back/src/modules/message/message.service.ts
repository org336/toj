import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, In, DataSource } from 'typeorm';
import { UserEntity } from '../user/user.entity';
import { StatusSystemEntity, StatusPrivateEntity } from './status.entity';
import { BodyEntity, BodyPrivateEntity, BodySystemEntity } from './body.entity';
import { ApiCode } from '~/constants/enums/api-code.enums';
import { ApiException } from '~/constants/exception/api.exception';
import { SenderDto } from '../user/user.dto';
import { log } from 'console';
@Injectable()
export class MessageService {
  constructor(
    private readonly dataSource: DataSource,
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
  async getSystemMessage(uid: string, identity: number): Promise<any> {
    const query = await this.bodySystemRepository
      .createQueryBuilder('system')
      .select('msg_id')
      .where('user_uid = :uid', { uid })
      .orWhere('face IN (:...toValues)', { toValues: [identity, 4] })
      .getRawMany();
    const msgIds = query.map((record) => record.msg_id);
    const messages = await this.bodyRepository.find({
      where: { id: In(msgIds) },
    });
    return messages;
  }
  async createSystemMessage(query: any, data: any): Promise<void> {
    const { face, uid } = query;
    const { event, type, title, content } = data;
    // 创建一个新的消息实体
    return await this.dataSource.transaction(async (transactionalEntityManager) => {
      const message = await transactionalEntityManager.save(
        this.bodyRepository.create({
          event,
          type,
          title,
          content,
        }),
      );
      if (!message || !message.id) {
        throw new ApiException('系统消息创建失败', ApiCode.BUSINESS_ERROR, 400);
      }
      const result = await transactionalEntityManager.save(
        this.bodySystemRepository.create({
          msg_id: message.id,
          user_uid: uid,
          face: face,
        }),
      );
      // 检查系统消息关系是否成功创建
      if (!result) {
        throw new ApiException('系统消息关系创建失败', ApiCode.BUSINESS_ERROR, 400);
      }
    });
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
  async updateStatusPrivate(sender_uid: string, receiver_uid: string): Promise<any> {
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
  async getPrivateMessage(sender_uid: string, receiver_uid: string): Promise<any> {
    // 先找出两个用户之间是否存在私人消息
    const query = await this.bodyPrivateRepository
      .createQueryBuilder('private')
      .select('msg_id')
      .where('sender_uid = :sender_uid', { sender_uid })
      .where('receiver_uid = :receiver_uid', { receiver_uid })
      .getRawMany();
    if (!query) {
      throw new ApiException('未找到双方的任何私人消息', ApiCode.BUSINESS_ERROR, 400);
    }
    const msgIds = query.map((record) => record.msg_id);

    const messages = await this.bodyRepository
      .createQueryBuilder()
      .whereInIds(msgIds)
      .getMany();
    return messages;
  }
  async getAllPrivateMessage(receiver_uid: string): Promise<any> {
    // 先找出当前用户是否有私人消息
    const queryResult = await this.bodyPrivateRepository.query(
      `
    SELECT 
      sender_uid, 
      GROUP_CONCAT(msg_id) AS msg_ids
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
      throw new ApiException('未找到用户的任何私人消息', ApiCode.BUSINESS_ERROR, 400);
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
        order: { update_time: 'DESC' },
      });

      result.push({
        sender: new SenderDto(sender),
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
    return await this.dataSource.transaction(async (transactionalEntityManager) => {
      // 首先存储在bodyRepository总消息中
      const message = await transactionalEntityManager.save(
        this.bodyRepository.create({
          event,
          type,
          title,
          content,
        }),
      );
      // 检查消息是否成功插入并获取消息ID
      if (!message || !message.id) {
        throw new ApiException('私人消息创建失败', ApiCode.BUSINESS_ERROR, 400);
      }
      // 使用得到的消息ID，在关系表插入发送者和接收者的关系
      const result = await transactionalEntityManager.save(
        this.bodyPrivateRepository.create({
          msg_id: message.id,
          sender_uid,
          receiver_uid,
        }),
      );
      // 检查私人消息关系是否成功创建
      if (!result) {
        throw new ApiException('私人消息关系创建失败', ApiCode.BUSINESS_ERROR, 400);
      }
    });
  }
  async deletePrivateMessage(id: number): Promise<void> {
    const result = await this.dataSource
      .createQueryBuilder()
      .delete()
      .from(BodyEntity)
      .where('id = :id', { id })
      .execute();
    if (!result.affected) {
      throw new ApiException('删除失败', ApiCode.BUSINESS_ERROR, 400);
    }
  }
}
