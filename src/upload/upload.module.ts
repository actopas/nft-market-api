import { Module } from '@nestjs/common';
import { UploadController } from './upload.controller';
import { UploadService } from './upload.service';

@Module({
  controllers: [UploadController], // 注册控制器
  providers: [UploadService], // 注册服务
})
export class Upload {}
