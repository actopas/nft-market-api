/*
 * @Describle:
 * @Author: actopas <fishmooger@gmail.com>
 * @Date: 2024-08-20 00:54:16
 * @LastEditors: actopas
 * @LastEditTime: 2024-08-23 00:24:52
 */
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Nft } from './nfts.model';
import { CreateNftDto } from './dto/create-nft.dto';
import { UpdateNftDto } from './dto/update-nft.dto';

@Injectable()
export class NftsService {
  constructor(@InjectModel('Nft') private readonly nftModel: Model<Nft>) {}

  async create(createNftDto: CreateNftDto): Promise<Nft> {
    const newNft = new this.nftModel(createNftDto);
    return await newNft.save();
  }

  async findAll(): Promise<Nft[]> {
    return await this.nftModel.find().exec();
  }

  async findOne(id: string): Promise<Nft> {
    const nft = await this.nftModel.findById(id).exec();
    if (!nft) {
      throw new NotFoundException(`NFT with ID ${id} not found`);
    }
    return nft;
  }

  async update(id: string, updateNftDto: UpdateNftDto): Promise<Nft> {
    const existingNft = await this.nftModel
      .findByIdAndUpdate(id, updateNftDto, { new: true })
      .exec();
    if (!existingNft) {
      throw new NotFoundException(`NFT with ID ${id} not found`);
    }
    return existingNft;
  }

  async remove(id: string): Promise<void> {
    const result = await this.nftModel.findByIdAndDelete(id).exec();
    if (!result) {
      throw new NotFoundException(`NFT with ID ${id} not found`);
    }
  }

  async findRecommanded(): Promise<Nft[]> {
    return await this.nftModel.find({ recommanded: true }).exec();
  }

  // 获取 notable 为 true 的 NFT 列表
  async findNotable(): Promise<Nft[]> {
    return await this.nftModel.find({ notable: true }).exec();
  }
}
