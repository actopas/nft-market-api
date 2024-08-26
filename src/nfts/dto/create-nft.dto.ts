/*
 * @Describle:
 * @Author: actopas <fishmooger@gmail.com>
 * @Date: 2024-08-20 04:01:33
 * @LastEditors: actopas
 * @LastEditTime: 2024-08-26 20:18:02
 */
import { IsString, IsNotEmpty } from 'class-validator';

export class CreateNftDto {
  @IsString()
  @IsNotEmpty()
  readonly name: string;

  @IsString()
  @IsNotEmpty()
  recipient: string;

  @IsString()
  @IsNotEmpty()
  tokenURI: string;

  @IsString()
  @IsNotEmpty()
  tokenId: string;

  @IsString()
  @IsNotEmpty()
  readonly imageUrl: string;

  @IsString()
  @IsNotEmpty()
  readonly description: string;

  @IsString()
  @IsNotEmpty()
  readonly owner: string;
}
