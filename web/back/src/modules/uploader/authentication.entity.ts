import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { UserEntity } from '../user/user.entity';

@Entity('user_authentication')
export class AuthenticationEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'uid', type: 'varchar', length: 36, nullable: true })
  uid: string;

  @Column({ name: 'real_name', type: 'varchar', length: 16, nullable: true })
  realName: string;
  @Column({
    type: 'tinyint',
    comment: '0表示为游客，1表示为学生，2表示为老师,5表示为管理员',
  })
  identity: number;
  @Column({ name: 'user_id', type: 'varchar', length: 16, nullable: true })
  userId: string;

  @Column({ name: 'img_url', type: 'varchar', length: 64, nullable: true })
  imgUrl: string;

  @ManyToOne(() => UserEntity)
  @JoinColumn({ name: 'uid' })
  user: UserEntity;
}
