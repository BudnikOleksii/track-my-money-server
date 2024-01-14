-- DropForeignKey
ALTER TABLE "Transaction" DROP CONSTRAINT "Transaction_subcategoryId_fkey";

-- AlterTable
ALTER TABLE "SubCategory" ADD COLUMN     "createdBy" INTEGER;

-- AlterTable
ALTER TABLE "Transaction" ALTER COLUMN "subcategoryId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "SubCategory" ADD CONSTRAINT "SubCategory_createdBy_fkey" FOREIGN KEY ("createdBy") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Transaction" ADD CONSTRAINT "Transaction_subcategoryId_fkey" FOREIGN KEY ("subcategoryId") REFERENCES "SubCategory"("id") ON DELETE SET NULL ON UPDATE CASCADE;
