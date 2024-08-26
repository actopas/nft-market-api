/*
 * @Describle:
 * @Author: actopas <fishmooger@gmail.com>
 * @Date: 2024-08-26 01:44:40
 * @LastEditors: actopas
 * @LastEditTime: 2024-08-27 05:24:36
 */
import { Injectable } from '@nestjs/common';
import Web3 from 'web3';
import SimpleNFT from './contract/SimpleNFT.json';
import Marketplace from './contract/NFTMarketplace.json';
@Injectable()
export class Web3Service {
  private web3: Web3;
  private nftContract: any;
  private marketContract: any;
  private fromAddress: string;
  private nftContractAddress: string;
  constructor() {
    console.log(
      process.env.WEB3_PROVIDER_URL,
      process.env.NFT_CONTRACT_ADDRESS,
    );
    this.web3 = new Web3(process.env.WEB3_PROVIDER_URL);
    this.nftContractAddress = process.env.NFT_CONTRACT_ADDRESS;
    const MarketContractAddress = process.env.MARKET_CONTRACT_ADDRESS;
    this.nftContract = new this.web3.eth.Contract(
      SimpleNFT.abi,
      this.nftContractAddress,
    );
    this.marketContract = new this.web3.eth.Contract(
      Marketplace.abi,
      MarketContractAddress,
    );
    const privateKey = process.env.PRIVATE_KEY;
    if (privateKey) {
      const account = this.web3.eth.accounts.privateKeyToAccount(privateKey);
      this.web3.eth.accounts.wallet.add(account);
      this.fromAddress = account.address;
      this.web3.eth.getBalance(this.fromAddress).then((balance) => {
        console.log(
          'Account balance:',
          this.web3.utils.fromWei(balance, 'ether'),
          'ETH',
        );
      });
    }
  }

  // 获取合约名称
  async getContractName(): Promise<string> {
    return await this.nftContract.methods.name().call();
  }

  // 获取账户
  async getAccounts(): Promise<string[]> {
    return await this.web3.eth.getAccounts();
  }

  // 铸造NFT
  async mintNFT(recipient: string, tokenURI: string): Promise<any> {
    console.log(recipient, this.fromAddress, 'res');
    const result = await this.nftContract.methods
      .mintNFT(recipient, tokenURI)
      .send({ from: this.fromAddress });
    return result;
  }

  // 购买NFT并完成交易
  async purchaseNFT(
    buyer: string,
    tokenId: string,
    seller: string,
    price: string,
  ): Promise<any> {
    try {
      // 将价格转换为wei
      const priceInWei = this.web3.utils.toWei(price, 'ether');
      // 调用合约的buyNFT方法
      const result = await this.marketContract.methods
        .buyNFT(this.nftContractAddress, tokenId, seller, priceInWei)
        .send({
          from: buyer, // 交易发起者（买家）
          value: priceInWei, // 传递ETH支付款
        });

      return result;
    } catch (error) {
      console.error('Error purchasing NFT:', error);
      throw new Error('Failed to purchase NFT');
    }
  }
}
