import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import cookieParser from 'cookie-parser';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: 'http://localhost:2048', // 前端域名
    credentials: true, // 允许前端请求携带凭证
  });
  app.use(cookieParser());
  app.setGlobalPrefix('api');
  const options = new DocumentBuilder()
    .setTitle('后端接口模拟')
    .setDescription('试着调试看看!')
    .setVersion('1')
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('docs', app, document);

  await app.listen(3000);
}
bootstrap();
