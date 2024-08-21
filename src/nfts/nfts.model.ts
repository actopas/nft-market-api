import { Schema, Document, model } from 'mongoose';

// 定义 Nft 的 Schema
export const NftSchema = new Schema({
  name: { type: String, required: true }, // NFT 名称
  imageUrl: { type: String, required: true }, // NFT 图像 URL
  artist: { type: String, required: true }, // 艺术家名称
  price: { type: String, required: true }, // 价格，可以根据需要定义为字符串或数字
  description: { type: String, required: true }, // NFT 描述
  properties: {
    // 其他属性，如稀有度和特征
    rarity: { type: String, required: true }, // 稀有度
    attributes: [{ type: String, required: true }], // 特征属性列表
  },
  onSale: { type: Boolean, default: false }, // 是否正在出售
  owner: { type: String, required: true }, // 当前所有者
  recommanded: { type: Boolean, default: false },
  notable: { type: Boolean, default: false },
  transactionHistory: [
    {
      // 交易历史记录
      date: { type: Date, default: Date.now }, // 交易日期
      price: { type: String }, // 交易价格
      previousOwner: { type: String }, // 前一个所有者
    },
  ],
});

// 定义 Nft 接口，用于类型检查
export interface Nft extends Document {
  name: string;
  imageUrl: string;
  artist: string;
  price: string;
  description: string;
  properties: {
    rarity: string;
    attributes: string[];
  };
  onSale: boolean;
  owner: string;
  recommanded: boolean;
  notable: boolean;
  transactionHistory: Array<{
    date: Date;
    price: string;
    previousOwner: string;
  }>;
}

// 导出 Mongoose 模型
export const NftModel = model<Nft>('Nft', NftSchema);
