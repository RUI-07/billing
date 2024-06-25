/*
  Warnings:

  - You are about to alter the column `phone` on the `customer` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(64)`.

*/
-- AlterTable
ALTER TABLE "customer" ADD COLUMN     "createdAt" TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "isDeleted" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "updatedAt" TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ALTER COLUMN "phone" SET DATA TYPE VARCHAR(64);

-- CreateIndex
CREATE INDEX "customer_name_idx" ON "customer"("name");

-- CreateIndex
CREATE INDEX "customer_user_idx" ON "customer"("user");

-- CreateIndex
CREATE INDEX "customer_user_name_idx" ON "customer"("user", "name");

-- CreateIndex
CREATE INDEX "customer_createdAt_idx" ON "customer"("createdAt");

-- CreateIndex
CREATE INDEX "customer_updatedAt_idx" ON "customer"("updatedAt");
