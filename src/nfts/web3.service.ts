import { Injectable } from '@nestjs/common';
import Web3 from 'web3';
import SimpleNFT from './contract/SimpleNFT.json';

@Injectable()
export class Web3Service {
  private web3: Web3;
  private contract: any;
  private fromAddress: string;

  constructor() {
    console.log(
      process.env.WEB3_PROVIDER_URL,
      process.env.NFT_CONTRACT_ADDRESS,
    );
    this.web3 = new Web3(process.env.WEB3_PROVIDER_URL);
    const contractAddress = process.env.NFT_CONTRACT_ADDRESS;
    this.contract = new this.web3.eth.Contract(SimpleNFT.abi, contractAddress);
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
    return await this.contract.methods.name().call();
  }

  // 获取账户
  async getAccounts(): Promise<string[]> {
    return await this.web3.eth.getAccounts();
  }

  // 铸造NFT
  async mintNFT(recipient: string, tokenURI: string): Promise<any> {
    console.log(recipient, this.fromAddress, 'res');
    const result = await this.contract.methods
      .mintNFT(recipient, tokenURI)
      .send({ from: this.fromAddress });
    return result;
  }

  // 购买NFT并完成交易
  async purchaseNFT(
    buyer: string,
    seller: string,
    tokenId: string,
    price: string,
  ): Promise<any> {
    // 转移NFT给买家，并从买家账户转移ETH给卖家
    await this.contract.methods.transferFrom(seller, buyer, tokenId).send({
      from: buyer,
      value: this.web3.utils.toWei(price, 'ether'),
    });
  }
}
