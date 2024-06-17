import { TypeOrmModuleOptions, TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { UserEntity } from '../../modules/user/user.entity';
export const DatabaseProviders = TypeOrmModule.forRootAsync({
  imports: [ConfigModule],
  useFactory: async (
    configService: ConfigService,
  ): Promise<TypeOrmModuleOptions> => ({
    type: 'mysql',
    host: configService.get<string>('DB_HOST'),
    port: configService.get<number>('DB_PORT'),
    username: configService.get<string>('DB_USERNAME'),
    password: configService.get<string>('DB_PASSWORD'),
    database: configService.get<string>('DB_DATABASE'),
    entities: [UserEntity],
    synchronize: configService.get<string>('NODE_ENV') === 'development', // 仅在开发环境中启用
  }),

  inject: [ConfigService],
});
