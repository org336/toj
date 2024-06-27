import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { CommonModule } from './common/common.module';
import { CustomRedisModule } from './shared/redis/redis.module';
import { DatabaseModule } from './shared/database/database.module';
import { UserModule } from './modules/user/user.module';
import { AuthModule } from './modules/auth/auth.module';
import { JwtAuthGuard } from './modules/auth/jwt-auth.guard';
import { MessageModule } from './modules/message/message.module';
import { APP_FILTER, APP_INTERCEPTOR, APP_GUARD } from '@nestjs/core';
import { ApiInterceptor } from './common/interceptors/api.interceptor';
import { ApiExceptionFilter } from './common/filters/api-exception.filter';
import { RecaptchaModule } from './shared/recaptcha/recaptcha.module';
import { AxiosModule } from './shared/axios/axios.module';
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      expandVariables: true,
      envFilePath: ['.env.development'],
    }),
    MessageModule,
    AxiosModule,
    RecaptchaModule,
    CommonModule,
    CustomRedisModule,
    DatabaseModule,
    UserModule,
    AuthModule,
  ],
  controllers: [],
  providers: [
    //全局拦截器
    {
      provide: APP_INTERCEPTOR,
      useClass: ApiInterceptor,
    },
    //全局过滤器
    {
      provide: APP_FILTER,
      useClass: ApiExceptionFilter,
    },
    //全局路由守卫
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
  ],
})
export class AppModule {}
