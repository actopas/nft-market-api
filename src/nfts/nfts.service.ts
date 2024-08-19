/*
 * @Describle:
 * @Author: actopas <fishmooger@gmail.com>
 * @Date: 2024-08-20 00:54:16
 * @LastEditors: actopas
 * @LastEditTime: 2024-08-20 01:01:41
 */
import { Injectable } from '@nestjs/common';

@Injectable()
export class NftService {
  // 这里可以从数据库或静态文件中读取数据
  getRecommendNfts() {
    return [
      {
        id: 1,
        name: 'NFT 1',
        imageUrl: '/images/nft1.png',
        description: 'Description 1',
      },
      {
        id: 2,
        name: 'NFT 2',
        imageUrl: '/images/nft2.png',
        description: 'Description 2',
      },
    ];
  }

  getNotableNfts() {
    return [
      {
        id: 3,
        name: 'NFT 3',
        imageUrl: '/images/nft3.png',
        description: 'Description 3',
      },
      {
        id: 4,
        name: 'NFT 4',
        imageUrl: '/images/nft4.png',
        description: 'Description 4',
      },
    ];
  }
}
