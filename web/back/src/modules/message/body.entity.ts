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
