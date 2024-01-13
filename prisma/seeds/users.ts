import * as bcrypt from 'bcrypt';
import { type Prisma, PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const LOCAL_ADMIN_PASSWORD = '123456';
const LOCAL_USER_PASSWORD = '123456';
const SALT_ROUNDS = 7;

export const seedUsers = async () => {
  try {
    await prisma.user.deleteMany();

    const currencies = await prisma.currency.findMany({
      select: { id: true, currency: true },
    });

    const users: Prisma.UserCreateManyInput[] = [
      {
        email: 'admin@gmail.com',
        password: await bcrypt.hash(LOCAL_ADMIN_PASSWORD, SALT_ROUNDS),
        firstName: 'Main',
        lastName: 'admin',
        baseCurrency: currencies[0].id,
        ip: '0.0.0.0',
        activated: true,
      },
      {
        email: 'user@gmail.com',
        password: await bcrypt.hash(LOCAL_USER_PASSWORD, SALT_ROUNDS),
        firstName: 'Regular',
        lastName: 'User',
        baseCurrency: currencies[0].id,
        ip: '0.0.0.0',
        activated: true,
      },
    ];

    await prisma.user.createMany({
      data: users,
      skipDuplicates: true,
    });

    console.log('Users seeding completed.');
  } catch (error) {
    console.error('Error seeding users:', error);
  }
};
