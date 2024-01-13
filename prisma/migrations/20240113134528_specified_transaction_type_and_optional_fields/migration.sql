/*
  Warnings:

  - Changed the type of `type` on the `Category` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "TransactionType" AS ENUM ('Income', 'Expenses');

-- AlterTable
ALTER TABLE "Category" DROP COLUMN "type",
ADD COLUMN     "type" "TransactionType" NOT NULL;

-- AlterTable
ALTER TABLE "Token" ALTER COLUMN "createdAt" SET DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "Transaction" ALTER COLUMN "note" DROP NOT NULL;

-- AlterTable
ALTER TABLE "User" ALTER COLUMN "createdAt" SET DEFAULT CURRENT_TIMESTAMP;
