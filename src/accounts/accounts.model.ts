/*
 * @Describle:
 * @Author: actopas <fishmooger@gmail.com>
 * @Date: 2024-08-23 15:33:28
 * @LastEditors: actopas
 * @LastEditTime: 2024-08-24 21:30:41
 */
import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

// 定义 Account Schema
@Schema()
export class Account extends Document {
  @Prop({ required: true, unique: true })
  address: string;
  @Prop({ type: [Types.ObjectId], default: [] })
  ownedNfts: Types.ObjectId[];

  @Prop({ type: [Types.ObjectId], ref: 'Nft' })
  createdNfts: Types.ObjectId[];

  @Prop({ type: [Types.ObjectId], ref: 'Nft' })
  transactions: Types.ObjectId[];
}

// 导出 AccountSchema 和 AccountDocument 类型
export type AccountDocument = Account & Document;
export const AccountSchema = SchemaFactory.createForClass(Account);
