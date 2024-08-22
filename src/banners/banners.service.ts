/*
 * @Describle:
 * @Author: actopas <fishmooger@gmail.com>
 * @Date: 2024-08-22 18:12:13
 * @LastEditors: actopas
 * @LastEditTime: 2024-08-22 18:13:05
 */
import { Injectable } from '@nestjs/common';

@Injectable()
export class BannerService {
  private readonly baseUrl = 'http://localhost:3001/banners'; // 请根据实际部署情况修改 URL

  getAllBanners(): string[] {
    return [
      `${this.baseUrl}/banner1.webp`,
      `${this.baseUrl}/banner2.webp`,
      `${this.baseUrl}/banner3.webp`,
      `${this.baseUrl}/banner4.webp`,
    ];
  }
}
