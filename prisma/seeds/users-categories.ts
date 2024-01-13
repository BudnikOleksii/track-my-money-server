import { type Prisma, PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const seedUserCategories = async () => {
  try {
    const user = await prisma.user.findUnique({
      select: { id: true, email: true },
      where: { email: 'user@gmail.com' },
    });

    if (!user) {
      return;
    }

    await prisma.usersCategories.deleteMany();
    await prisma.usersSubcategories.deleteMany();

    const categories: Prisma.UsersCategoriesCreateManyInput[] = (
      await prisma.category.findMany()
    ).map((category) => ({
      userId: user.id,
      categoryId: category.id,
    }));

    const subCategories: Prisma.UsersSubcategoriesCreateManyInput[] = (
      await prisma.category.findMany()
    ).map((subcat) => ({
      userId: user.id,
      subcategoryId: subcat.id,
    }));

    await prisma.usersCategories.createMany({
      data: categories,
      skipDuplicates: true,
    });

    await prisma.usersSubcategories.createMany({
      data: subCategories,
      skipDuplicates: true,
    });

    console.log('Roles seeding completed.');
  } catch (error) {
    console.error('Error seeding roles:', error);
  }
};
