/*
 * @Describle:
 * @Author: actopas <fishmooger@gmail.com>
 * @Date: 2024-08-21 18:36:51
 * @LastEditors: actopas
 * @LastEditTime: 2024-08-21 18:40:57
 */
import { PartialType } from '@nestjs/mapped-types';
import { CreateNftDto } from './create-nft.dto';

export class UpdateNftDto extends PartialType(CreateNftDto) {}
