/*
 * @Describle:
 * @Author: actopas <fishmooger@gmail.com>
 * @Date: 2024-08-18 01:38:08
 * @LastEditors: actopas
 * @LastEditTime: 2024-08-20 03:51:07
 */
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { NftModule } from './nfts/nfts.module';
import { MongooseModule } from '@nestjs/mongoose';
@Module({
  imports: [NftModule, MongooseModule.forRoot('mongodb://localhost/nft_db')],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
