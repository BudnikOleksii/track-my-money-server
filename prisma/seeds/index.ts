import { PrismaClient } from '@prisma/client';

import { seedCategories } from './categories';
import { seedCurrencies } from './currency';
import { seedRoles } from './roles';
import { seedTransactions } from './transactions';
import { seedUsers } from './users';
import { seedUserCategories } from './users-categories';
import { seedUsersRoles } from './users-roles';

const prisma = new PrismaClient();

const main = async () => {
  try {
    await seedRoles();
    await seedCurrencies();
    await seedUsers();
    await seedUsersRoles();
    await seedCategories();
    await seedUserCategories();
    await seedTransactions();

    console.log('All tables seeding completed.');
  } catch (error) {
    console.error('Error seeding tables:', error);
  } finally {
    await prisma.$disconnect();
  }
};

main();
