-- CreateEnum
CREATE TYPE "CustomerType" AS ENUM ('Selling', 'Purchase');

-- CreateTable
CREATE TABLE "customer" (
    "id" BIGSERIAL NOT NULL,
    "name" VARCHAR(64) NOT NULL,
    "type" "CustomerType" NOT NULL,
    "statsStartAt" TIMESTAMP(0) NOT NULL,
    "phone" TEXT,
    "user" BIGINT NOT NULL,

    CONSTRAINT "customer_pkey" PRIMARY KEY ("id")
);
