/*
  Warnings:

  - You are about to drop the column `gender` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `username` on the `User` table. All the data in the column will be lost.
  - Made the column `user_id` on table `Address` required. This step will fail if there are existing NULL values in that column.

*/
-- DropIndex
DROP INDEX "User_username_key";

-- AlterTable
ALTER TABLE "Address" ALTER COLUMN "user_id" SET NOT NULL;

-- AlterTable
ALTER TABLE "User" DROP COLUMN "gender",
DROP COLUMN "username",
ALTER COLUMN "last_login" DROP NOT NULL;

-- DropEnum
DROP TYPE "GenderType";
