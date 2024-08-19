/*
 * @Describle:
 * @Author: actopas <fishmooger@gmail.com>
 * @Date: 2024-08-20 00:54:16
 * @LastEditors: actopas
 * @LastEditTime: 2024-08-20 04:11:00
 */
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Nft } from './nfts.schema';
import { CreateNftDto } from './dto/create-nft.dto';
@Injectable()
export class NftService {
  constructor(@InjectModel('Nft') private readonly nftModel: Model<Nft>) {}

  async getRecommendNfts(): Promise<Nft[]> {
    return this.nftModel.find({ recommanded: true }).exec();
  }
  async getNotableNfts(): Promise<Nft[]> {
    return this.nftModel.find({ notable: true }).exec();
  }
  async createNft(createNftDto: CreateNftDto): Promise<Nft> {
    const newNft = new this.nftModel(createNftDto);
    return await newNft.save();
  }
  async findAllNfts(): Promise<Nft[]> {
    return await this.nftModel.find().exec();
  }

  async findOneNft(id: string): Promise<Nft> {
    return await this.nftModel.findById(id).exec();
  }
  async updateNft(id: string, updateNftDto: CreateNftDto): Promise<Nft> {
    return await this.nftModel
      .findByIdAndUpdate(id, updateNftDto, { new: true })
      .exec();
  }
  async deleteNft(id: string): Promise<Nft> {
    return await this.nftModel.findByIdAndDelete(id).exec();
  }
}
