import { type Prisma, PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const seedCurrencies = async () => {
  try {
    await prisma.currency.deleteMany();
    const currencies: Prisma.CurrencyCreateInput[] = [
      { currency: 'UAH' },
      { currency: 'USD' },
    ];

    await prisma.currency.createMany({
      data: currencies,
      skipDuplicates: true,
    });

    console.log('Currencies seeding completed.');
  } catch (error) {
    console.error('Error seeding currencies:', error);
  }
};
