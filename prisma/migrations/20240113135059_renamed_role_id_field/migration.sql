/*
  Warnings:

  - The primary key for the `UsersRoles` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `roles` on the `UsersRoles` table. All the data in the column will be lost.
  - Added the required column `roleId` to the `UsersRoles` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "UsersRoles" DROP CONSTRAINT "UsersRoles_roles_fkey";

-- AlterTable
ALTER TABLE "UsersRoles" DROP CONSTRAINT "UsersRoles_pkey",
DROP COLUMN "roles",
ADD COLUMN     "roleId" INTEGER NOT NULL,
ADD CONSTRAINT "UsersRoles_pkey" PRIMARY KEY ("userId", "roleId");

-- AddForeignKey
ALTER TABLE "UsersRoles" ADD CONSTRAINT "UsersRoles_roleId_fkey" FOREIGN KEY ("roleId") REFERENCES "roles"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
