import { type Prisma, PrismaClient } from '@prisma/client';

import * as transactions from './data/transactions-13.01.json';

const prisma = new PrismaClient();

export const seedTransactions = async () => {
  try {
    const user = await prisma.user.findUnique({
      where: { email: 'user@gmail.com' },
    });
    const currency = await prisma.currency.findUnique({
      where: { currency: 'UAH' },
    });

    if (!user || !currency) {
      return;
    }

    await prisma.transaction.deleteMany();

    const categories = await prisma.category.findMany();
    const subcategories = await prisma.subCategory.findMany();

    const categoriesMap = categories.reduce((acc, cat) => {
      acc.set(cat.title, cat.id);
      return acc;
    }, new Map<string, number>());
    const subcategoriesMap = subcategories.reduce((acc, subcar) => {
      acc.set(subcar.title, subcar.id);
      return acc;
    }, new Map<string, number>());

    const preparedTransactions: Prisma.TransactionCreateManyInput[] =
      transactions.map((trans) => {
        const { Amount, Category, Subcategory, Date: date, Note } = trans;
        const categoryId = categoriesMap.get(Category) || categories[0].id;
        const subcategoryId = Subcategory
          ? subcategoriesMap.get(Subcategory)
          : undefined;

        return {
          amount: Amount,
          baseCurrencyAmount: Amount,
          userId: user.id,
          categoryId,
          subcategoryId,
          currencyId: currency.id,
          date: new Date(date).toISOString(),
          note: Note,
        };
      });

    await prisma.transaction.createMany({
      data: preparedTransactions,
      skipDuplicates: true,
    });

    console.log('Transactions seeding completed.');
  } catch (error) {
    console.error('Error seeding transactions:', error);
  }
};
