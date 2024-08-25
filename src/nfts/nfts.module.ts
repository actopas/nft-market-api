/*
 * @Describle:
 * @Author: actopas <fishmooger@gmail.com>
 * @Date: 2024-08-20 00:58:15
 * @LastEditors: actopas
 * @LastEditTime: 2024-08-26 01:47:31
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
import { Web3Service } from '../web3/web3.service';
@Module({
  imports: [
    MongooseModule.forFeature([{ name: Nft.name, schema: NftSchema }]),
    AccountModule,
  ],
  providers: [NftsService, Web3Service],
  controllers: [NftsController],
})
export class NftModule {}
