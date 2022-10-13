-- DropForeignKey
ALTER TABLE "HelpCenter" DROP CONSTRAINT "HelpCenter_userId_fkey";

-- AlterTable
ALTER TABLE "HelpCenter" ALTER COLUMN "userId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "HelpCenter" ADD CONSTRAINT "HelpCenter_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
