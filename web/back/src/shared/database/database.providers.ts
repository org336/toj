import { TypeOrmModuleOptions, TypeOrmModule } from '@nestjs/typeorm';
import { ConfigService } from '@nestjs/config';
export const DatabaseProviders = TypeOrmModule.forRootAsync({
  useFactory: async (
    configService: ConfigService,
  ): Promise<TypeOrmModuleOptions> => ({
    type: 'mysql',
    host: configService.get<string>('DB_HOST'),
    port: configService.get<number>('DB_PORT'),
    username: configService.get<string>('DB_USERNAME'),
    password: configService.get<string>('DB_PASSWORD'),
    database: configService.get<string>('DB_DATABASE'),
    entities: [__dirname + '/../../modules/**/*.entity{.ts,.js}'],
    synchronize: configService.get<string>('NODE_ENV') === 'development', // 仅在开发环境中启用
    timezone: '+08:00', // 设置数据库时区
    dateStrings: true, //统一将timestamp、date、datetime字段返回字符串
  }),

  inject: [ConfigService],
});
