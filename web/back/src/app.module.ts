import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { CustomRedisModule } from './shared/redis/redis.module';
import { DatabaseModule } from './shared/database/database.module';
import { StudentModule } from './modules/student/student.module';
import { TeacherModule } from './modules/teacher/teacher.module';
import { AuthModule } from './modules/auth/auth.module';
import { APP_FILTER, APP_INTERCEPTOR } from '@nestjs/core';
import { ApiInterceptor } from './common/interceptors/api.interceptor';
import { ApiExceptionFilter } from './common/filters/api-exception.filter';
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      expandVariables: true,
      envFilePath: ['.env.development'],
    }),
    CustomRedisModule,
    DatabaseModule,
    StudentModule,
    TeacherModule,
    AuthModule,
  ],
  controllers: [],
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useClass: ApiInterceptor,
    },
    {
      provide: APP_FILTER,
      useClass: ApiExceptionFilter,
    },
  ],
})
export class AppModule {}
