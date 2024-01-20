import type { Currency, Prisma } from '@prisma/client';

import { Injectable } from '@nestjs/common';

import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class CurrenciesRepository {
  constructor(private prisma: PrismaService) {}

  create(payload: Prisma.CurrencyCreateInput) {
    return this.prisma.currency.create({
      data: payload,
    });
  }

  getAll() {
    return this.prisma.currency.findMany();
  }

  getById(id: Currency['id']) {
    return this.prisma.currency.findUnique({
      where: { id },
    });
  }

  getCurrency(currency: Currency['currency']) {
    return this.prisma.currency.findUnique({
      where: { currency },
    });
  }
}
