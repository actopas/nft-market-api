/*
 * @Describle:
 * @Author: actopas <fishmooger@gmail.com>
 * @Date: 2024-08-20 00:58:15
 * @LastEditors: actopas
 * @LastEditTime: 2024-08-21 18:36:13
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
import { NftSchema } from './nfts.model';
import { NftsController } from './nfts.controller';
import { NftsService } from './nfts.service';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'Nft', schema: NftSchema }])],
  controllers: [NftsController],
  providers: [NftsService],
})
export class NftModule {}
