/*
 * @Describle:
 * @Author: actopas <fishmooger@gmail.com>
 * @Date: 2024-08-20 00:56:34
 * @LastEditors: actopas
 * @LastEditTime: 2024-08-26 02:44:55
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
import { Web3Service } from './web3.service';

@Controller('nfts')
export class NftsController {
  constructor(
    private readonly nftsService: NftsService,
    private readonly web3Service: Web3Service,
  ) {}

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

  @Post('purchase')
  async purchaseNFT(
    @Body('buyerAddress') buyerAddress: string,
    @Body('sellerAddress') sellerAddress: string,
    @Body('nftId') nftId: string,
    @Body('price') price: string,
  ) {
    await this.nftsService.purchaseNFT(
      buyerAddress,
      sellerAddress,
      nftId,
      price,
    );
    return { message: 'Purchase processed successfully' };
  }

  @Post()
  async create(@Body() createNftDto: CreateNftDto): Promise<Nft> {
    const accounts = await this.web3Service.getAccounts();
    const fromAddress = accounts[0]; // 使用第一个账户作为发件人

    // 首先在区块链上铸造NFT
    const mintResult = await this.web3Service.mintNFT(
      createNftDto.recipient,
      createNftDto.tokenURI,
      fromAddress,
    );

    // 然后在数据库中创建NFT记录
    return await this.nftsService.create({
      ...createNftDto,
      tokenId: mintResult.events.Transfer.returnValues.tokenId, // 使用区块链返回的tokenId
    });
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
