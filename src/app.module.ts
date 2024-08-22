/*
 * @Describle:
 * @Author: actopas <fishmooger@gmail.com>
 * @Date: 2024-08-18 01:38:08
 * @LastEditors: actopas
 * @LastEditTime: 2024-08-23 02:28:52
 */
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { NftModule } from './nfts/nfts.module';
import { Upload } from './upload/upload.module';
import { BannersModule } from './banners/banners.module';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    NftModule,
    BannersModule,
    Upload,
    MongooseModule.forRoot('mongodb://127.0.0.1:27017/nft_db'),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
