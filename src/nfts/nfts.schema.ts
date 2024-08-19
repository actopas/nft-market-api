import { Schema, Document, model } from 'mongoose';

// 定义 Nft 的 Schema
export const NftSchema = new Schema({
  name: { type: String, required: true },
  imageUrl: { type: String, required: true },
  description: { type: String, required: true },
  recommanded: { type: Boolean, default: false },
  notable: { type: Boolean, default: false },
});

// 定义 Nft 接口，用于类型检查
export interface Nft extends Document {
  id: string;
  name: string;
  imageUrl: string;
  description: string;
  recommanded: boolean;
  notable: boolean;
}

// 导出 Mongoose 模型
export const NftModel = model<Nft>('Nft', NftSchema);
