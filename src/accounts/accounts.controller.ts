import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { AccountsService } from './accounts.service';
import { CreateAccountDto, UpdateAccountDto } from './dto/account.dto';

@Controller('accounts')
export class AccountsController {
  constructor(private readonly accountsService: AccountsService) {}

  @Post()
  async create(@Body() createAccountDto: CreateAccountDto) {
    try {
      const newAccount = await this.accountsService.create(createAccountDto);
      return newAccount;
    } catch (error) {
      throw new HttpException(
        'Failed to create account',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  @Get()
  async findAll() {
    try {
      const accounts = await this.accountsService.findAll();
      return accounts;
    } catch (error) {
      throw new HttpException(
        'Failed to retrieve accounts',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Get(':address')
  async findOne(@Param('address') address: string) {
    try {
      const account = await this.accountsService.findOne(address);
      return account;
    } catch (error) {
      throw new HttpException(
        'Failed to find or create account',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Put(':address')
  async update(
    @Param('address') address: string,
    @Body() updateAccountDto: UpdateAccountDto,
  ) {
    try {
      const updatedAccount = await this.accountsService.update(
        address,
        updateAccountDto,
      );
      if (!updatedAccount) {
        throw new HttpException('Account not found', HttpStatus.NOT_FOUND);
      }
      return updatedAccount;
    } catch (error) {
      throw new HttpException(
        'Failed to update account',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Delete(':address')
  async remove(@Param('address') address: string) {
    try {
      const result = await this.accountsService.remove(address);
      if (!result) {
        throw new HttpException('Account not found', HttpStatus.NOT_FOUND);
      }
      return result;
    } catch (error) {
      throw new HttpException(
        'Failed to delete account',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
