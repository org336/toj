import { Entity, Column, PrimaryColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity('task')
export class TaskEntity {
  @PrimaryColumn({ type: 'varchar', length: 16, comment: '任务唯一ID标识符' })
  id: string;

  @Column({ type: 'varchar', length: 72, nullable: true, comment: '任务名字' })
  name: string;

  @Column({ type: 'varchar', length: 45, nullable: true, comment: '分配给的班级' })
  class: string;

  @Column({ type: 'timestamp', nullable: true, comment: '开始时间' })
  startDate: Date;

  @Column({ type: 'timestamp', nullable: true, comment: '截止时间' })
  endDate: Date;

  @CreateDateColumn({
    type: 'timestamp',
    nullable: true,
    default: () => 'CURRENT_TIMESTAMP',
    comment: '创建时间',
  })
  createTime: Date;

  @UpdateDateColumn({
    type: 'timestamp',
    nullable: true,
    default: () => 'CURRENT_TIMESTAMP',
    onUpdate: 'CURRENT_TIMESTAMP',
    comment: '最新修改时间',
  })
  updateTime: Date;
}
