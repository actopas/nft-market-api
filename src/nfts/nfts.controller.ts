/*
 * @Describle:
 * @Author: actopas <fishmooger@gmail.com>
 * @Date: 2024-08-20 00:56:34
 * @LastEditors: actopas
 * @LastEditTime: 2024-08-20 04:08:34
 */
import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
} from '@nestjs/common';
import { NftService } from './nfts.service';
import { CreateNftDto } from './dto/create-nft.dto';
import { Nft } from './nfts.schema';
@Controller('nfts')
export class NftController {
  constructor(private readonly nftService: NftService) {}

  @Get('recommend')
  getRecommendNfts(): Promise<Nft[]> {
    return this.nftService.getRecommendNfts(); // 返回推荐的 NFT 列表
  }

  @Post()
  createNft(@Body() createNftDto: CreateNftDto): Promise<Nft> {
    return this.nftService.createNft(createNftDto);
  }

  @Get()
  findAllNfts(): Promise<Nft[]> {
    return this.nftService.findAllNfts();
  }

  @Get(':id')
  findOneNft(@Param('id') id: string): Promise<Nft> {
    return this.nftService.findOneNft(id);
  }

  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() updateNftDto: CreateNftDto,
  ): Promise<Nft> {
    return this.nftService.updateNft(id, updateNftDto);
  }

  @Delete(':id')
  delete(@Param('id') id: string): Promise<Nft> {
    return this.nftService.deleteNft(id);
  }
}
