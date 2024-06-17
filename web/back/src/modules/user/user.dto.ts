import { ApiProperty } from '@nestjs/swagger';

export class UserDto {
  @ApiProperty({ example: '3fa85f64-5717-4562-b3fc-2c963f66afa6' })
  uid: string;

  @ApiProperty({ example: '2959346375@qq.com' })
  email: string;

  @ApiProperty({ example: '1520223609' })
  userId: string;

  @ApiProperty({ example: 'test123456!' })
  password: string;
}
