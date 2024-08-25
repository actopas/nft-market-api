/*
 * @Describle:
 * @Author: actopas <fishmooger@gmail.com>
 * @Date: 2024-08-23 02:22:27
 * @LastEditors: actopas
 * @LastEditTime: 2024-08-24 21:11:44
 */
import { Injectable } from '@nestjs/common';
import { extname, join } from 'path';
import { writeFile, mkdir } from 'fs/promises';
import { existsSync } from 'fs';
import { Express } from 'express';

@Injectable()
export class UploadService {
  async uploadFile(file: Express.MulterFile): Promise<string> {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    const ext = extname(file.originalname);
    const filename = `${file.fieldname}-${uniqueSuffix}${ext}`;

    // 使用 process.cwd() 获取根目录路径
    const uploadsDir = join(process.cwd(), 'uploads');

    // 检查 uploads 目录是否存在，如果不存在则创建它
    if (!existsSync(uploadsDir)) {
      await mkdir(uploadsDir, { recursive: true });
    }

    // 拼接完整的文件路径
    const filePath = join(uploadsDir, filename);

    // 写入文件到指定路径
    await writeFile(filePath, file.buffer);

    // 返回文件的 URL
    const fileUrl = `http://localhost:3001/uploads/${filename}`;
    return fileUrl;
  }
}
