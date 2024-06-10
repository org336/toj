import { Entity, Column, PrimaryColumn, Unique } from 'typeorm';

@Entity('teacher')
@Unique(['email'])
export class TeacherEntity {
  @PrimaryColumn({ type: 'varchar', length: 36, comment: '老师唯一标识符' })
  uid: string;

  @Column({ type: 'varchar', length: 16, comment: '教职工号' })
  teacher_id: string;

  @Column({ type: 'varchar', length: 64, comment: '邮箱' })
  email: string;

  @Column({ type: 'varchar', length: 16, comment: '用户名称' })
  nick_name: string;

  @Column({ type: 'varchar', length: 16, comment: '教师真实姓名' })
  real_name: string;

  @Column({ type: 'varchar', length: 60, comment: '加密后的密码' })
  password: string;

  @Column({ type: 'tinyint', comment: '0表示该用户为学生，1表示为老师' })
  identity: number;

  @Column({ type: 'varchar', length: 64, comment: '头像URL' })
  avatar_url: string;

  @Column({ type: 'text', comment: '用户签名' })
  signature: string;
}
