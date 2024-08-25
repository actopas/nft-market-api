/*
 * @Describle:
 * @Author: actopas <fishmooger@gmail.com>
 * @Date: 2024-08-20 00:56:34
 * @LastEditors: actopas
 * @LastEditTime: 2024-08-25 00:55:01
 */
import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
  Query,
} from '@nestjs/common';
import { NftsService } from './nfts.service';
import { CreateNftDto } from './dto/create-nft.dto';
import { UpdateNftDto } from './dto/update-nft.dto';
import { Nft, NftSummary } from './nfts.model';
@Controller('nfts')
export class NftsController {
  constructor(private readonly nftsService: NftsService) {}
  @Get('recommanded')
  async getRecommandedNfts(): Promise<Nft[]> {
    return await this.nftsService.findRecommanded();
  }

  @Get('notable')
  async getNotableNfts(): Promise<Nft[]> {
    return await this.nftsService.findNotable();
  }

  @Get('findNftsByIds')
  async findNftsByIds(
    @Query('ids') ids: string | string[],
  ): Promise<NftSummary[]> {
    const idsArray = Array.isArray(ids) ? ids : ids.split(',');
    return this.nftsService.findNftsByIds(idsArray);
  }
  @Post('makeNftOffer')
  async makeNftOffer(
    @Body('buyerAddress') buyerAddress: string,
    @Body('sellerAddress') sellerAddress: string,
    @Body('nftId') nftId: string,
    @Body('price') price: string,
  ) {
    await this.nftsService.makeOffer(buyerAddress, sellerAddress, nftId, price);
    return { message: 'Offer processed successfully' };
  }
  @Post()
  async create(@Body() createNftDto: CreateNftDto): Promise<Nft> {
    return await this.nftsService.create(createNftDto);
  }

  @Get()
  async findAll(): Promise<Nft[]> {
    return await this.nftsService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Nft> {
    return await this.nftsService.findOne(id);
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updateNftDto: UpdateNftDto,
  ): Promise<Nft> {
    return await this.nftsService.update(id, updateNftDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<void> {
    return await this.nftsService.remove(id);
  }
}
