/*
  Warnings:

  - You are about to drop the column `user` on the `bill` table. All the data in the column will be lost.
  - You are about to drop the column `bill` on the `bill_item` table. All the data in the column will be lost.
  - You are about to drop the column `user` on the `customer` table. All the data in the column will be lost.
  - Added the required column `userId` to the `bill` table without a default value. This is not possible if the table is not empty.
  - Added the required column `billId` to the `bill_item` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `customer` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "bill_user_idx";

-- DropIndex
DROP INDEX "bill_item_bill_idx";

-- DropIndex
DROP INDEX "customer_user_idx";

-- DropIndex
DROP INDEX "customer_user_name_idx";

-- AlterTable
ALTER TABLE "bill" DROP COLUMN "user",
ADD COLUMN     "userId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "bill_item" DROP COLUMN "bill",
ADD COLUMN     "billId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "customer" DROP COLUMN "user",
ADD COLUMN     "userId" INTEGER NOT NULL;

-- CreateIndex
CREATE INDEX "bill_userId_idx" ON "bill"("userId");

-- CreateIndex
CREATE INDEX "bill_createdAt_idx" ON "bill"("createdAt");

-- CreateIndex
CREATE INDEX "bill_updatedAt_idx" ON "bill"("updatedAt");

-- CreateIndex
CREATE INDEX "bill_item_billId_idx" ON "bill_item"("billId");

-- CreateIndex
CREATE INDEX "bill_item_createdAt_idx" ON "bill_item"("createdAt");

-- CreateIndex
CREATE INDEX "bill_item_updatedAt_idx" ON "bill_item"("updatedAt");

-- CreateIndex
CREATE INDEX "customer_userId_idx" ON "customer"("userId");
