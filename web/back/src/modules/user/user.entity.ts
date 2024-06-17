import { Entity, Column, PrimaryColumn, Unique } from 'typeorm';

@Entity('user')
@Unique(['userId', 'email'])
export class UserEntity {
  @PrimaryColumn({ type: 'varchar', length: 36, comment: '学生唯一标识符' })
  uid: string;

  @Column({ name: 'user_id', type: 'varchar', length: 16, comment: '学生学号' })
  userId: string;

  @Column({ type: 'varchar', length: 64, comment: '邮箱' })
  email: string;

  @Column({
    name: 'nick_name',
    type: 'varchar',
    length: 16,
    comment: '用户昵称',
  })
  nickName: string;

  @Column({
    name: 'real_name',
    type: 'varchar',
    length: 16,
    comment: '真实姓名',
  })
  realName: string;

  @Column({ type: 'char', length: 60, comment: '加密后的密码' })
  password: string;

  @Column({
    type: 'tinyint',
    comment: '0表示为学生，1表示为老师,2表示为管理员',
  })
  identity: number;

  @Column({
    name: 'avatar_url',
    type: 'varchar',
    length: 64,
    comment: '头像URL',
  })
  avatarUrl: string;

  @Column({ type: 'text', comment: '用户签名' })
  signature: string;
}
