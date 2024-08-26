/*
 * @Describle:
 * @Author: actopas <fishmooger@gmail.com>
 * @Date: 2024-08-20 00:54:16
 * @LastEditors: actopas
 * @LastEditTime: 2024-08-27 01:18:02
 */
import {
  Injectable,
  NotFoundException,
  InternalServerErrorException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Nft, NftSummary, TransactionHistory } from './nfts.model';
import { CreateNftDto } from './dto/create-nft.dto';
import { UpdateNftDto } from './dto/update-nft.dto';
import { Account } from '../accounts/accounts.model';
import { NftStatus } from '../types/status.enum';
import { Web3Service } from './web3.service';
@Injectable()
export class NftsService {
  constructor(
    @InjectModel('Nft') private readonly nftModel: Model<Nft>,
    @InjectModel('Account') private readonly accountModel: Model<Account>, // 注入 Account 模型
    private readonly web3Service: Web3Service,
  ) {}

  async create(createNftDto: CreateNftDto): Promise<Nft> {
    // 1. 创建新的 Nft 实例
    const newNft = new this.nftModel({
      ...createNftDto,
      _id: new Types.ObjectId(), // 手动生成 ObjectId
    });
    const createdNft = await newNft.save(); // 确保在保存后 `_id` 已生成
    console.log(createdNft);
    // 2. 铸造NFT到区块链，并获取生成的 tokenId
    const mintResult = await this.web3Service.mintNFT(
      createdNft.owner,
      createdNft.tokenURI,
    );
    console.log(mintResult.events.Transfer.returnValues);
    const tokenId = mintResult.events.Transfer.returnValues.tokenId;
    createdNft.tokenId = tokenId;
    await createdNft.save(); // 保存更新后的 NFT

    // 3. 获取创建者的账号信息
    const account = await this.accountModel
      .findOne({ address: createdNft.owner })
      .exec();

    if (!account) {
      throw new NotFoundException(
        `Account with address ${createdNft.owner} not found`,
      );
    }

    // 4. 添加 NFT 的 `_id` 到 `createdNfts` 和 `ownedNfts` 数组
    account.createdNfts.push(createdNft._id);
    account.ownedNfts.push(createdNft._id);

    // 5. 保存更新后的 Account
    await account.save();

    if (!createdNft._id) {
      throw new Error('Failed to generate _id for created NFT');
    }

    return createdNft;
  }

  async findAll(): Promise<Nft[]> {
    return await this.nftModel.find().exec();
  }

  async findOne(id: string): Promise<Nft> {
    try {
      console.log(`Finding NFT with ID: ${id}`);
      const nft = await this.nftModel.findById(new Types.ObjectId(id)).exec();
      console.log('Query completed'); // 验证查询是否完成
      return nft;
    } catch (error) {
      console.error(`Error in findOne for ID ${id}:`, error);
      return null;
    }
  }
  async findNftsByIds(ids: string[]): Promise<NftSummary[]> {
    const objectIds = ids.map((id) => new Types.ObjectId(id));
    const nfts = await this.nftModel
      .find({ _id: { $in: objectIds } })
      .select('_id tokenId name description status')
      .exec();
    console.log(nfts, 'nfts');
    return nfts.map((nft) => {
      return {
        id: nft._id.toString(),
        tokenId: nft.tokenId!,
        name: nft.name!,
        description: nft.description!,
        status: nft.status,
      } as NftSummary;
    });
  }
  async update(id: string, updateNftDto: UpdateNftDto): Promise<Nft> {
    const existingNft = await this.nftModel
      .findByIdAndUpdate(new Types.ObjectId(id), updateNftDto, { new: true })
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
    return await this.nftModel
      .find({ recommanded: true, status: NftStatus.OnSale })
      .exec();
  }

  async findNotable(): Promise<Nft[]> {
    return await this.nftModel
      .find({ notable: true, status: NftStatus.OnSale })
      .exec();
  }
  async purchaseNFT(
    buyerAddress: string,
    sellerAddress: string,
    nftId: string,
    price: string,
  ): Promise<void> {
    const buyer = await this.accountModel
      .findOne({ address: buyerAddress })
      .exec();
    const seller = await this.accountModel
      .findOne({ address: sellerAddress })
      .exec();
    const nft = await this.nftModel.findById(new Types.ObjectId(nftId)).exec();
    await this.web3Service.purchaseNFT(
      buyerAddress,
      sellerAddress,
      nft.tokenId,
      price,
    );
    if (!buyer || !seller || !nft) {
      throw new NotFoundException('Buyer, seller or NFT not found');
    }

    // 1. 将 NFT 从卖家的 collectedNfts 中移除
    seller.ownedNfts = seller.ownedNfts.filter((id) => !id.equals(nft._id));

    // 2. 将 NFT 添加到买家的 collectedNfts 中
    buyer.ownedNfts.push(nft._id);

    // 3. 更新 NFT 的 TransactionHistory
    const transaction: TransactionHistory = {
      date: new Date(),
      price,
      previousOwner: sellerAddress,
    };
    nft.status = 0;
    nft.transactionHistory.push(transaction);

    seller.transactions.push(nft._id);
    buyer.transactions.push(nft._id);

    try {
      // 4. 保存更改
      await seller.save();
      await buyer.save();
      await nft.save();
    } catch (error) {
      throw new InternalServerErrorException(
        'Failed to process the transaction',
      );
    }
  }
}
