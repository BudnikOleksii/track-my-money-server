import { PrismaClient } from '@prisma/client';

import { seedRoles } from './roles';
import { seedUsers } from './users';
import { seedUsersRoles } from './users-roles';

const prisma = new PrismaClient();

const main = async () => {
  try {
    await seedRoles();
    await seedUsers();
    await seedUsersRoles();

    console.log('All tables seeding completed.');
  } catch (error) {
    console.error('Error seeding tables:', error);
  } finally {
    await prisma.$disconnect();
  }
};

main();
