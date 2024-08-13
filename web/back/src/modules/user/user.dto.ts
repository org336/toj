import exp from 'constants';
import { UserEntity } from './user.entity';

export class SenderDto {
  uid: string;
  nickName: string;
  realName: string;
  avatarUrl: string;
  signature: string;
  identity: number;

  constructor(user: UserEntity) {
    this.uid = user.uid;
    this.nickName = user.nickName;
    this.realName = user.realName;
    this.avatarUrl = user.avatarUrl;
    this.signature = user.signature;
  }
}
export class ProfileDto {
  uid: string;
  email: string;
  userId: string;
  realName: string;
  avatarUrl: string;

  constructor(user: UserEntity) {
    this.uid = user.uid;
    this.email = user.email;
    this.userId = user.userId;
    this.realName = user.realName;
    this.avatarUrl = user.avatarUrl;
  }
  static fromEntities(users: UserEntity[]): ProfileDto[] {
    return users.map((user) => new ProfileDto(user));
  }
}
export class ClassToUserDto {
  uid: string;
  email: string;
  userId: string;
  realName: string;
  create_time: Date;
  constructor(user: UserEntity) {
    this.uid = user.uid;
    this.email = user.email;
    this.userId = user.userId;
    this.realName = user.realName;
  }
}
