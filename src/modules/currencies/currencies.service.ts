import type { Currency, Prisma } from '@prisma/client';

import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { CurrenciesRepository } from './currencies.repository';

@Injectable()
export class CurrenciesService {
  constructor(private currenciesRepository: CurrenciesRepository) {}

  async create(dto: Prisma.CurrencyCreateInput) {
    const candidate = await this.currenciesRepository.getCurrency(dto.currency);

    if (candidate) {
      throw new BadRequestException('Currency already exists');
    }

    return this.currenciesRepository.create(dto);
  }

  getAll() {
    return this.currenciesRepository.getAll();
  }

  async getById(id: Currency['id']) {
    const currency = await this.currenciesRepository.getById(id);

    if (!currency) {
      throw new NotFoundException('Currency not found');
    }

    return currency;
  }
}
