/*
 * @Describle:
 * @Author: actopas <fishmooger@gmail.com>
 * @Date: 2024-08-20 00:58:15
 * @LastEditors: actopas
 * @LastEditTime: 2024-08-20 00:58:30
 */
import { Module } from '@nestjs/common';
import { NftController } from './nfts.controller';
import { NftService } from './nfts.service';

@Module({
  controllers: [NftController],
  providers: [NftService],
})
export class NftModule {}
