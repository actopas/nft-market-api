/*
 * @Describle:
 * @Author: actopas <fishmooger@gmail.com>
 * @Date: 2024-08-18 01:38:08
 * @LastEditors: actopas
 * @LastEditTime: 2024-08-20 01:36:05
 */
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { NftModule } from './nfts/nfts.module'; // 导入 NFT 模块
@Module({
  imports: [NftModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
