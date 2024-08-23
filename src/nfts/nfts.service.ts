/*
 * @Describle:
 * @Author: actopas <fishmooger@gmail.com>
 * @Date: 2024-08-20 00:54:16
 * @LastEditors: actopas
 * @LastEditTime: 2024-08-24 00:07:52
 */
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Nft, NftSummary } from './nfts.model';
import { CreateNftDto } from './dto/create-nft.dto';
import { UpdateNftDto } from './dto/update-nft.dto';
import { Account } from '../accounts/accounts.model'; // 假设你有一个 Account 模型
@Injectable()
export class NftsService {
  constructor(
    @InjectModel('Nft') private readonly nftModel: Model<Nft>,
    @InjectModel('Account') private readonly accountModel: Model<Account>, // 注入 Account 模型
  ) {}

  async create(createNftDto: CreateNftDto): Promise<Nft> {
    // 1. 创建新的 Nft 实例
    const newNft = new this.nftModel(createNftDto);
    const createdNft = await newNft.save();

    // 2. 获取创建者的账号信息
    const account = await this.accountModel
      .findOne({ address: createNftDto.owner })
      .exec();
    console.log(account, createNftDto, createdNft, 'account');
    if (!account) {
      throw new NotFoundException(
        `Account with address ${createNftDto.owner} not found`,
      );
    }
    account.createdNfts.push(createdNft._id || new Types.ObjectId());
    account.ownedNfts.push(createdNft._id || new Types.ObjectId());
    // 4. 保存更新后的 Account
    await account.save();

    return createdNft;
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
  async findNftsByIds(ids: string[]): Promise<NftSummary[]> {
    const nfts = await this.nftModel
      .find({ _id: { $in: ids } })
      .select('_id name description') // 选择返回字段
      .exec();

    return nfts.map((nft) => {
      return {
        id: nft._id.toString(), // 显式地确保 id 存在并转换为字符串
        name: nft.name!, // 使用非空断言符号 (!) 确保 name 存在
        description: nft.description!, // 确保 description 存在
      } as NftSummary;
    });
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
    return await this.nftModel.find({ recommanded: true, onSale: true }).exec();
  }

  async findNotable(): Promise<Nft[]> {
    return await this.nftModel.find({ notable: true, onSale: true }).exec();
  }
}
