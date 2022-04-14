-- CreateEnum
CREATE TYPE "Role" AS ENUM ('VENDOR', 'USER', 'PREMIUM', 'ADMIN', 'MODERATOR', 'BANNED');

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "roles" "Role"[];
