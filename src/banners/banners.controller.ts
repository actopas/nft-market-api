/*
 * @Describle:
 * @Author: actopas <fishmooger@gmail.com>
 * @Date: 2024-08-22 18:15:42
 * @LastEditors: actopas
 * @LastEditTime: 2024-08-22 18:17:09
 */
import { Controller, Get, Res } from '@nestjs/common';
import { BannerService } from './banners.service';
import { Response } from 'express';

@Controller('banners')
export class BannerController {
  constructor(private readonly bannerService: BannerService) {}

  @Get('list')
  getAllBanners(@Res() res: Response) {
    const banners = this.bannerService.getAllBanners();
    res.status(200).json(banners);
  }
}
