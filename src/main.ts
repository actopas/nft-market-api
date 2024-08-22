/*
 * @Describle:
 * @Author: actopas <fishmooger@gmail.com>
 * @Date: 2024-08-18 01:38:08
 * @LastEditors: actopas
 * @LastEditTime: 2024-08-23 02:52:35
 */
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  /*
  app.useStaticAssets(join(__dirname, '..', 'client', 'build'));
  app.setBaseViewsDir(join(__dirname, '..', 'client', 'build'));
  app.get('*', (req, res) => {
    res.sendFile(join(__dirname, '..', 'client', 'build', 'index.html'));
  });
  */
  app.useStaticAssets(join(__dirname, '..', 'uploads'), {
    prefix: '/uploads',
  });
  app.useStaticAssets('public');
  app.enableCors();
  await app.listen(3001);
}
bootstrap();
