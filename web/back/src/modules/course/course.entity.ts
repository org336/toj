import {
  Entity,
  PrimaryColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { UserEntity } from '../user/user.entity';
@Entity('course')
export class Course {
  @PrimaryColumn({ type: 'varchar', length: 16, comment: '课程唯一编码' })
  id: string;

  @Column({ type: 'varchar', length: 72, nullable: true, comment: '课程名称' })
  name: string;

  @Column({
    type: 'varchar',
    length: 36,
    nullable: true,
    comment: '对应user表的用户UID，授课老师',
  })
  teacher_uid: string;

  @Column({ type: 'varchar', length: 64, nullable: true, comment: '课程图片URL' })
  cover_url: string;

  @CreateDateColumn({
    type: 'timestamp',
    nullable: true,
    default: () => 'CURRENT_TIMESTAMP',
    comment: '创建时间',
  })
  create_time: Date;

  @UpdateDateColumn({
    type: 'timestamp',
    nullable: true,
    default: () => 'CURRENT_TIMESTAMP',
    onUpdate: 'CURRENT_TIMESTAMP',
    comment: '更新时间',
  })
  update_time: Date;

  @ManyToOne(() => UserEntity)
  @JoinColumn({ name: 'teacher_uid', referencedColumnName: 'uid' })
  teacher: UserEntity;
}
