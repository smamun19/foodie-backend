/*
  Warnings:

  - Added the required column `TotalFee` to the `Order` table without a default value. This is not possible if the table is not empty.
  - Added the required column `subTotalFee` to the `Order` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Order" ADD COLUMN     "TotalFee" INTEGER NOT NULL,
ADD COLUMN     "subTotalFee" INTEGER NOT NULL;
