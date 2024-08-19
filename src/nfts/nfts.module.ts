/*
 * @Describle:
 * @Author: actopas <fishmooger@gmail.com>
 * @Date: 2024-08-20 00:58:15
 * @LastEditors: actopas
 * @LastEditTime: 2024-08-20 03:52:25
 */
/*
 * @Describle:
 * @Author: actopas <fishmooger@gmail.com>
 * @Date: 2024-08-20 00:58:15
 * @LastEditors: actopas
 * @LastEditTime: 2024-08-20 03:32:15
 */
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { NftSchema } from './nfts.schema';
import { NftController } from './nfts.controller';
import { NftService } from './nfts.service';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'Nft', schema: NftSchema }])],
  controllers: [NftController],
  providers: [NftService],
})
export class NftModule {}
