/*
  Warnings:

  - You are about to drop the column `location` on the `Restaurant` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[restaurantId]` on the table `Location` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "Location" DROP CONSTRAINT "Location_userId_fkey";

-- AlterTable
ALTER TABLE "Location" ADD COLUMN     "restaurantId" TEXT,
ALTER COLUMN "userId" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Restaurant" DROP COLUMN "location",
ADD COLUMN     "locationId" INTEGER;

-- CreateIndex
CREATE UNIQUE INDEX "Location_restaurantId_key" ON "Location"("restaurantId");

-- AddForeignKey
ALTER TABLE "Location" ADD CONSTRAINT "Location_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Location" ADD CONSTRAINT "Location_restaurantId_fkey" FOREIGN KEY ("restaurantId") REFERENCES "Restaurant"("id") ON DELETE SET NULL ON UPDATE CASCADE;
