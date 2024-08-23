// src/accounts/accounts.service.ts

import {
  Injectable,
  NotFoundException,
  InternalServerErrorException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Account, AccountDocument } from './accounts.model'; // 确保路径正确
import { CreateAccountDto, UpdateAccountDto } from './dto/account.dto';

@Injectable()
export class AccountsService {
  constructor(
    @InjectModel(Account.name) private accountModel: Model<AccountDocument>,
  ) {}

  async create(createAccountDto: CreateAccountDto): Promise<Account> {
    try {
      const newAccount = new this.accountModel(createAccountDto);
      return await newAccount.save();
    } catch (error) {
      throw new InternalServerErrorException('Failed to create account');
    }
  }

  async findAll(): Promise<Account[]> {
    try {
      return await this.accountModel.find().exec();
    } catch (error) {
      throw new InternalServerErrorException('Failed to retrieve accounts');
    }
  }

  async findOne(address: string): Promise<Account> {
    let account = await this.accountModel.findOne({ address }).exec();
    if (!account) {
      // 如果未找到，则创建新账户
      try {
        const createAccountDto = new CreateAccountDto(address, [], [], []);
        account = new this.accountModel(createAccountDto);
        await account.save();
      } catch (error) {
        throw new InternalServerErrorException('Failed to create account');
      }
    }
    return account;
  }

  async update(
    address: string,
    updateAccountDto: UpdateAccountDto,
  ): Promise<Account> {
    try {
      const updatedAccount = await this.accountModel
        .findOneAndUpdate({ address }, updateAccountDto, { new: true })
        .exec();
      if (!updatedAccount) {
        throw new NotFoundException('Account not found');
      }
      return updatedAccount;
    } catch (error) {
      throw new InternalServerErrorException('Failed to update account');
    }
  }

  async remove(address: string): Promise<Account> {
    try {
      const deletedAccount = await this.accountModel
        .findOneAndDelete({ address })
        .exec();
      if (!deletedAccount) {
        throw new NotFoundException('Account not found');
      }
      return deletedAccount;
    } catch (error) {
      throw new InternalServerErrorException('Failed to delete account');
    }
  }
}
