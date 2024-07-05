/*
  Warnings:

  - You are about to drop the column `customer` on the `bill` table. All the data in the column will be lost.
  - Added the required column `customerId` to the `bill` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "bill" DROP COLUMN "customer",
ADD COLUMN     "customerId" INTEGER NOT NULL;

-- CreateIndex
CREATE INDEX "bill_customerId_idx" ON "bill"("customerId");
