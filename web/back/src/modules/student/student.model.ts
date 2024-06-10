import { ApiProperty } from '@nestjs/swagger';

export class AccountInfo {
  @ApiProperty({ description: '用户名' })
  username: string;

  @ApiProperty({ description: '昵称' })
  nickname: string;

  @ApiProperty({ description: '邮箱' })
  email: string;

  @ApiProperty({ description: '学号' })
  studentID: string;

  @ApiProperty({ description: '密码' })
  password: string;
}
