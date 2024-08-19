import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('message_status_system')
export class StatusSystemEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 36, nullable: true, comment: '接收者UID' })
  user_uid: string;

  @Column({ type: 'int', unsigned: true, nullable: true, comment: '已读的系统消息数量' })
  already_read: number;

  @Column({ type: 'int', unsigned: true, nullable: true, comment: '当前用户的系统消息总数' })
  total: number;

  @Column({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
    onUpdate: 'CURRENT_TIMESTAMP',
    comment: '最近已读时间',
  })
  last_read_time: Date;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP', comment: '创建时间' })
  create_time: Date;
}
@Entity('message_status_private')
export class StatusPrivateEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 45, nullable: true })
  sender_uid: string;

  @Column({ type: 'varchar', length: 45, nullable: true })
  receiver_uid: string;
  @Column({ type: 'int', unsigned: true, nullable: true, comment: '已读的系统消息数量' })
  already_read: number;

  @Column({ type: 'int', unsigned: true, nullable: true, comment: '当前用户的系统消息总数' })
  total: number;

  @Column({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
    onUpdate: 'CURRENT_TIMESTAMP',
    comment: '最近已读时间',
  })
  last_read_time: Date;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP', comment: '创建时间' })
  create_time: Date;
}
