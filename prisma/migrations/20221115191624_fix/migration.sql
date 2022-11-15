/*
  Warnings:

  - The primary key for the `OrderedItem` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- AlterTable
ALTER TABLE "OrderedItem" DROP CONSTRAINT "OrderedItem_pkey",
ADD CONSTRAINT "OrderedItem_pkey" PRIMARY KEY ("orderId", "itemId", "price");
