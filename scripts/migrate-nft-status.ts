import { connect, disconnect, model } from 'mongoose';
import { NftSchema } from '../src/nfts/nfts.model';
import { NftStatus } from '../src/types/status.enum';
import { Nft } from '../src/nfts/nfts.model';

// 临时扩展 Nft 接口，添加 onSale 属性
interface NftWithOnSale extends Nft {
  onSale: boolean;
}

// 创建模型实例
const NftModel = model<NftWithOnSale>('Nft', NftSchema);

async function migrateNftStatus() {
  await connect('mongodb://localhost:27017/nft-db'); // 替换为你的实际数据库连接字符串

  const nfts = await NftModel.find({});

  for (const nft of nfts) {
    nft.status = nft.onSale ? NftStatus.OnSale : NftStatus.Hold;
    await nft.save();
  }

  console.log('Migration completed');

  await disconnect();
}

migrateNftStatus().catch((error) => {
  console.error('Error during migration:', error);
  process.exit(1);
});
