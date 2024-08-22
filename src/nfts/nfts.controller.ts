/*
 * @Describle:
 * @Author: actopas <fishmooger@gmail.com>
 * @Date: 2024-08-20 00:56:34
 * @LastEditors: actopas
 * @LastEditTime: 2024-08-23 00:52:03
 */
import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
} from '@nestjs/common';
import { NftsService } from './nfts.service';
import { CreateNftDto } from './dto/create-nft.dto';
import { UpdateNftDto } from './dto/update-nft.dto';
import { Nft } from './nfts.model';

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
