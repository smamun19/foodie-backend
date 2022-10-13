-- AlterTable
ALTER TABLE "HelpCenter" ADD COLUMN     "isActive" BOOLEAN NOT NULL DEFAULT true;

-- AlterTable
ALTER TABLE "HelpCenterQuery" ADD COLUMN     "isActive" BOOLEAN NOT NULL DEFAULT true;
