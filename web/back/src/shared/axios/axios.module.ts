import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { HttpModule } from '@nestjs/axios';
import { AxiosService } from './axios.service';

@Module({
  imports: [
    HttpModule.registerAsync({
      useFactory: async (configService: ConfigService) => ({
        timeout: parseInt(configService.get<string>('HTTP_TIMEOUT'), 10),
        maxRedirects: parseInt(
          configService.get<string>('HTTP_MAX_REDIRECTS'),
          10,
        ),
      }),
      inject: [ConfigService],
    }),
  ],
  providers: [AxiosService],
  exports: [AxiosService],
})
export class AxiosModule {}
