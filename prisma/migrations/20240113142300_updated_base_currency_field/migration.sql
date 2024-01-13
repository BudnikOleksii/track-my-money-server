-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_baseCurrency_fkey" FOREIGN KEY ("baseCurrency") REFERENCES "Currency"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
