/*
 * @Describle:
 * @Author: actopas <fishmooger@gmail.com>
 * @Date: 2024-08-23 11:53:14
 * @LastEditors: actopas
 * @LastEditTime: 2024-08-23 23:19:53
 */
// src/accounts/dto/account.dto.ts

export class CreateAccountDto {
  readonly address: string;
  readonly createdNfts: any[];
  readonly transactions: any[];
  readonly ownedNfts: any[];

  constructor(
    address: string,
    createdNfts: any[],
    transactions: any[],
    ownedNfts: any[],
  ) {
    this.address = address;
    this.createdNfts = createdNfts;
    this.transactions = transactions;
    this.ownedNfts = ownedNfts;
  }
}
export class UpdateAccountDto {
  readonly ownedNfts?: string[];
  readonly transactions?: string[];
}
