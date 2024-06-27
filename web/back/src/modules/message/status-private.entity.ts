import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('message_status_private')
export class StatusPrivateEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 45, nullable: true })
  sender_uid: string;

  @Column({ type: 'varchar', length: 45, nullable: true })
  receiver_uid: string;

  @Column({ type: 'timestamp', nullable: true, default: () => 'NULL' })
  last_read_time: Date;

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
