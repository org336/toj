import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('message_status_system')
export class StatusSystemEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 36, nullable: true, comment: '接收者UID' })
  user_uid: string;

  @Column({ type: 'timestamp', nullable: true, comment: '最近已读时间' })
  last_read_time: Date;

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
    comment: '最后修改时间',
  })
  update_time: Date;
}
