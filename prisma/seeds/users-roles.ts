import { type Prisma, PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const ADMIN = 'ADMIN';
const USER = 'USER';

export const seedUsersRoles = async () => {
  try {
    await prisma.usersRoles.deleteMany();

    const roles = await prisma.role.findMany({
      where: {
        OR: [{ value: ADMIN }, { value: USER }],
      },
      select: { id: true, value: true },
    });

    const users = await prisma.user.findMany({
      select: { id: true, email: true },
    });

    const roleIdsMap = new Map(roles.map((role) => [role.value, role.id]));
    const userIdsMap = new Map(users.map((user) => [user.email, user.id]));

    const userRolesData: Prisma.UsersRolesCreateManyInput[] = [
      {
        userId: userIdsMap.get(users[0].email)!,
        roleId: roleIdsMap.get(ADMIN)!,
      },
      {
        userId: userIdsMap.get(users[1].email)!,
        roleId: roleIdsMap.get(USER)!,
      },
    ];

    await prisma.usersRoles.createMany({
      data: userRolesData,
      skipDuplicates: true,
    });

    console.log('User Roles seeding completed.');
  } catch (error) {
    console.error('Error seeding User Roles:', error);
  }
};
