/*
 * @Describle:
 * @Author: actopas <fishmooger@gmail.com>
 * @Date: 2024-08-22 18:22:15
 * @LastEditors: actopas
 * @LastEditTime: 2024-08-22 18:22:27
 */
import { Module } from '@nestjs/common';
import { BannerController } from './banners.controller';
import { BannerService } from './banners.service';

@Module({
  controllers: [BannerController],
  providers: [BannerService],
})
export class BannersModule {}
