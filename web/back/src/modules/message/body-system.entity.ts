import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

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
