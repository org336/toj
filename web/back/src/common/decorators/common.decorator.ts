import { SetMetadata } from '@nestjs/common';

// 公共路由装饰器
export const IS_PUBLIC_ROUTE = 'isPublic';
export const Public = () => SetMetadata(IS_PUBLIC_ROUTE, true);
