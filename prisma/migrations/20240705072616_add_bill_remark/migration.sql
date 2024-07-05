/*
  Warnings:

  - Added the required column `remark` to the `bill` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "bill" ADD COLUMN     "remark" VARCHAR NOT NULL;
