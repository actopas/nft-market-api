/*
 * @Describle:
 * @Author: actopas <fishmooger@gmail.com>
 * @Date: 2024-08-20 00:58:15
 * @LastEditors: actopas
 * @LastEditTime: 2024-08-24 00:13:41
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
import { Nft, NftSchema } from './nfts.model';
import { NftsService } from './nfts.service';
import { NftsController } from './nfts.controller';
import { AccountModule } from '../accounts/accounts.module';
@Module({
  imports: [
    MongooseModule.forFeature([{ name: Nft.name, schema: NftSchema }]),
    AccountModule,
  ],
  providers: [NftsService],
  controllers: [NftsController],
})
export class NftModule {}
