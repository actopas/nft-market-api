import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

// 定义 TransactionHistory 子文档 Schema
@Schema()
export class TransactionHistory {
  @Prop({ type: Date, default: Date.now })
  date: Date;

  @Prop({ type: String })
  price: string;

  @Prop({ type: String })
  previousOwner: string;
}

// 定义 Nft Schema
@Schema({ timestamps: true }) // 自动添加 createdAt 和 updatedAt 字段
export class Nft extends Document {
  @Prop({ type: Types.ObjectId })
  _id: Types.ObjectId;

  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  imageUrl: string;

  @Prop({ required: true })
  artist: string;

  @Prop({ required: true })
  price: string;

  @Prop({ required: true })
  description: string;

  @Prop({
    type: {
      rarity: { type: String, required: true },
      attributes: [{ type: String, required: true }],
    },
  })
  properties: {
    rarity: string;
    attributes: string[];
  };

  @Prop({ default: false })
  onSale: boolean;

  @Prop({ required: true })
  owner: string;

  @Prop({ default: false })
  recommanded: boolean;

  @Prop({ default: false })
  notable: boolean;

  @Prop([
    {
      date: { type: Date, default: Date.now },
      price: String,
      previousOwner: String,
    },
  ])
  createdAt?: Date;
  updatedAt?: Date;

  @Prop({ type: [TransactionHistory] })
  transactionHistory: TransactionHistory[];
}

export const NftSchema = SchemaFactory.createForClass(Nft);
export type NftSummary = Pick<Nft, 'id' | 'name' | 'description'>;
export type NftOwnSummary = Pick<Nft, 'createdAt' | 'name' | 'description'>;
