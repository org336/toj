import { UserEntity } from './user.entity';

export class ProfileDto {
  userId: string;
  email: string;
  nickName: string;
  realName: string;
  avatarUrl: string;
  signature: string;
  identity: number;

  constructor(user: UserEntity) {
    this.userId = user.userId;
    this.email = user.email;
    this.nickName = user.nickName;
    this.realName = user.realName;
    this.identity = user.identity;
    this.avatarUrl = user.avatarUrl;
    this.signature = user.signature;
    this.identity = user.identity;
  }
}
