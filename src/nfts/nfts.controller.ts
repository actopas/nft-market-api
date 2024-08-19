/*
 * @Describle:
 * @Author: actopas <fishmooger@gmail.com>
 * @Date: 2024-08-20 00:56:34
 * @LastEditors: actopas
 * @LastEditTime: 2024-08-20 00:56:45
 */
import { Controller, Get } from '@nestjs/common';
import { NftService } from './nfts.service';

@Controller('nfts')
export class NftController {
  constructor(private readonly nftService: NftService) {}

  @Get('recommend')
  getRecommendNfts() {
    return this.nftService.getRecommendNfts();
  }

  @Get('notable')
  getHotNfts() {
    return this.nftService.getNotableNfts();
  }
}
