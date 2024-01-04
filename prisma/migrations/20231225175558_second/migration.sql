/*
  Warnings:

  - You are about to drop the column `isVerified` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "User" DROP COLUMN "isVerified",
ADD COLUMN     "emailVerified" TIMESTAMP(3),
ALTER COLUMN "username" DROP NOT NULL,
ALTER COLUMN "hashedPassword" DROP NOT NULL;
