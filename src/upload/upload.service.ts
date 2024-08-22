// upload.service.ts
import { Injectable } from '@nestjs/common';
import { extname } from 'path';
import { Express } from 'express';
import { writeFile } from 'fs/promises';
import { join } from 'path';

@Injectable()
export class UploadService {
  async uploadFile(file: Express.MulterFile): Promise<string> {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    const ext = extname(file.originalname);
    const filename = `${file.fieldname}-${uniqueSuffix}${ext}`;

    const filePath = join(__dirname, '..', '..', 'uploads', filename);

    await writeFile(filePath, file.buffer);

    const fileUrl = `http://localhost:3001/uploads/${filename}`;
    return fileUrl;
  }
}
