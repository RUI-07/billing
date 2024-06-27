-- CreateTable
CREATE TABLE "bill" (
    "id" SERIAL NOT NULL,
    "user" INTEGER NOT NULL,
    "date" TIMESTAMP(0) NOT NULL,
    "customer" INTEGER NOT NULL,
    "isDeleted" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "bill_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "bill_item" (
    "id" SERIAL NOT NULL,
    "bill" INTEGER NOT NULL,
    "name" VARCHAR(64) NOT NULL,
    "quantity" INTEGER NOT NULL,
    "price" INTEGER NOT NULL,
    "total" INTEGER NOT NULL,
    "isDeleted" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "bill_item_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "bill_user_idx" ON "bill"("user");

-- CreateIndex
CREATE INDEX "bill_item_bill_idx" ON "bill_item"("bill");
