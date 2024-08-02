import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('message_body')
export class BodyEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'varchar',
    length: 16,
    nullable: true,
    comment: '消息事件，比如通知、公告、点赞、评论等',
  })
  event: string;

  @Column({
    type: 'tinyint',
    nullable: true,
    comment: '通知类型：0为系统消息，1为私人消息，2为班级消息',
  })
  type: number;

  @Column({ type: 'varchar', length: 36, nullable: true })
  title: string;

  @Column({ type: 'text', nullable: true })
  content: string;

  @Column({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
    comment: '创建时间',
  })
  create_time: Date;

  @Column({
    type: 'timestamp',
    nullable: true,
    default: () => 'CURRENT_TIMESTAMP',
    onUpdate: 'CURRENT_TIMESTAMP',
    comment: '更新时间',
  })
  update_time: Date;
}
@Entity('message_body_system')
export class BodySystemEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 36, nullable: true, comment: '接收者UID' })
  user_uid: string;

  @Column({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
    comment: '关系创建时间',
  })
  create_time: Date;

  @Column({
    type: 'timestamp',
    nullable: true,
    default: () => 'CURRENT_TIMESTAMP',
    onUpdate: 'CURRENT_TIMESTAMP',
    comment: '操作更新时间',
  })
  update_time: Date;
}
@Entity('message_body_private')
export class BodyPrivateEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'int', nullable: true })
  msg_id: number;

  @Column({ type: 'varchar', length: 45, nullable: true, comment: '发送者UID' })
  sender_uid: string;

  @Column({ type: 'varchar', length: 45, nullable: true, comment: '接收者UID' })
  receiver_uid: string;

  @Column({
    type: 'timestamp',
    nullable: true,
    default: () => 'CURRENT_TIMESTAMP',
  })
  create_time: Date;

  @Column({
    type: 'timestamp',
    nullable: true,
    default: () => 'CURRENT_TIMESTAMP',
    onUpdate: 'CURRENT_TIMESTAMP',
  })
  update_time: Date;
}
