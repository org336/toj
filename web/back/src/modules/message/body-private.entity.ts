import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

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
