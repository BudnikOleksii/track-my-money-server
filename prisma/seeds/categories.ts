import { type Prisma, PrismaClient } from '@prisma/client';

import * as transactions from './data/transactions-13.01.json';

const prisma = new PrismaClient();

export const seedCategories = async () => {
  const user = await prisma.user.findUnique({
    select: { id: true, email: true },
    where: { email: 'user@gmail.com' },
  });

  if (!user) {
    return;
  }

  const categoriesMap: Record<string, string> = {};
  const subCategoriesMap: Record<string, string[]> = {};

  const categories: Prisma.CategoryCreateManyInput[] = [];

  transactions.forEach((trans) => {
    const { Category, Subcategory, Type } = trans;

    if (Category && !categoriesMap[Category]) {
      categoriesMap[Category] = Type;
      categories.push({
        type: Type === 'Income' ? 'Income' : 'Expenses',
        title: Category,
        createdBy: user.id,
      });
    }

    // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
    if (!subCategoriesMap[Category]) {
      subCategoriesMap[Category] = [];
    }

    if (Subcategory && !subCategoriesMap[Category].includes(Subcategory)) {
      subCategoriesMap[Category].push(Subcategory);
    }
  });

  try {
    await prisma.category.deleteMany();
    await prisma.subCategory.deleteMany();

    await prisma.category.createMany({
      data: categories,
      skipDuplicates: true,
    });

    const createdCategories = await prisma.category.findMany();

    const preparedSubcategories: Prisma.SubCategoryCreateManyInput[] = [];

    for (const subcategoryMap in subCategoriesMap) {
      const currentCat = createdCategories.find(
        (cat) => cat.title === subcategoryMap,
      );

      if (currentCat) {
        subCategoriesMap[subcategoryMap].forEach((subcat) => {
          preparedSubcategories.push({
            title: subcat,
            categoryId: currentCat.id,
          });
        });
      }
    }

    await prisma.subCategory.createMany({
      data: preparedSubcategories,
      skipDuplicates: true,
    });

    console.log('Categories and subcategories seeding completed.');
  } catch (error) {
    console.error('Error seeding categories and subcategories seeding:', error);
  }
};
