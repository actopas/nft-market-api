import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

// 定义 OwnedNft 子文档 Schema
@Schema()
export class OwnedNft extends Document {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  description: string;

  @Prop({ required: true })
  createdAt: Date;
}

// 导出 OwnedNftSchema
export const OwnedNftSchema = SchemaFactory.createForClass(OwnedNft);

// 定义 Account Schema
@Schema()
export class Account extends Document {
  @Prop({ type: [Types.ObjectId], default: [] }) // 使用子文档的 Schema
  ownedNfts: Types.ObjectId[];

  @Prop({ type: [Types.ObjectId], ref: 'Nft' }) // 引用 Nft 模型的 ObjectId
  createdNfts: Types.ObjectId[];
}

// 导出 AccountSchema 和 AccountDocument 类型
export type AccountDocument = Account & Document;
export const AccountSchema = SchemaFactory.createForClass(Account);
