import {
  Entity,
  Column,
  PrimaryColumn,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
  Index,
} from 'typeorm';
import { TaskEntity } from '../task/task.entity';
import { UserEntity } from '../user/user.entity';
@Entity('class')
export class ClassEntity {
  @PrimaryColumn({ type: 'varchar', length: 16, comment: '班级编号' })
  id: string;

  @Column({ type: 'varchar', length: 72, nullable: true, comment: '班级专业' })
  major: string;

  @Column({ type: 'varchar', length: 72, nullable: true, comment: '班级名称' })
  name: string;

  @Column({ type: 'tinyint', unsigned: true, nullable: true, comment: '班级总人数' })
  total: number;

  @Column({
    type: 'tinyint',
    unsigned: true,
    nullable: true,
    comment: '0：允许学生加入，1：禁止学生加入',
  })
  permit_join: number;
  @Column({
    type: 'tinyint',
    unsigned: true,
    nullable: true,
    comment: '加入班级是否需要教师验证，0：否，1：是',
  })
  join_confirm: number;
  @Column({
    type: 'tinyint',
    unsigned: true,
    nullable: true,
    comment: '是否开启结课模式,0关闭，1开启',
  })
  finish_mode: number;
  @CreateDateColumn({
    type: 'timestamp',
    nullable: true,
    default: () => 'CURRENT_TIMESTAMP',
    comment: '班级创建时间',
  })
  create_time: Date;

  @UpdateDateColumn({
    type: 'timestamp',
    nullable: true,
    default: () => 'CURRENT_TIMESTAMP',
    onUpdate: 'CURRENT_TIMESTAMP',
    comment: '最新的班级更新操作时间',
  })
  update_time: Date;
}
@Entity('class_to_task')
@Index('class_id_idx', ['class_id'])
@Index('task_id_idx', ['task_id'])
export class ClassToTask {
  @PrimaryGeneratedColumn({ comment: '对应一条关系' })
  id: number;

  @Column({ type: 'varchar', length: 16, nullable: true, comment: '对应class表的ID_' })
  class_id: string;

  @Column({ type: 'varchar', length: 16, nullable: true, comment: '对应task表的ID' })
  task_id: string;
  @Column({ type: 'tinyint', unsigned: true, nullable: true, comment: '已经递交任务的人数' })
  submitted: number;

  @Column({ type: 'tinyint', unsigned: true, nullable: true, comment: '需要递交任务的总人数' })
  total: number;
  @CreateDateColumn({
    type: 'timestamp',
    nullable: true,
    default: () => 'CURRENT_TIMESTAMP',
    comment: '任务创建时间',
  })
  create_time: Date;

  @ManyToOne(() => ClassEntity, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'class_id', referencedColumnName: 'id' })
  class: ClassEntity;

  @ManyToOne(() => TaskEntity, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'task_id', referencedColumnName: 'id' })
  task: TaskEntity;
}
@Entity('class_to_user')
@Index('class_to_id_idx', ['class_id'])
@Index('user_to_uid_idx', ['user_uid'])
export class ClassToUser {
  @PrimaryGeneratedColumn({ comment: '表示一条对应关系的ID' })
  id: number;

  @Column({
    type: 'varchar',
    length: 16,
    nullable: true,
    comment: '对应class_body里面的班级ID',
  })
  class_id: string;

  @Column({ type: 'varchar', length: 36, nullable: true, comment: '用户UID' })
  user_uid: string;

  @CreateDateColumn({
    type: 'timestamp',
    nullable: true,
    default: () => 'CURRENT_TIMESTAMP',
    comment: '加入班级的时间',
  })
  create_time: Date;

  @ManyToOne(() => ClassEntity, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'class_id', referencedColumnName: 'id' })
  class: ClassEntity;

  @ManyToOne(() => UserEntity, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'user_uid', referencedColumnName: 'uid' })
  user: UserEntity;
}
