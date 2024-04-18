/*
  Warnings:

  - You are about to drop the column `isAdmin` on the `User` table. All the data in the column will be lost.

*/
-- CreateEnum
CREATE TYPE "Role" AS ENUM ('USER', 'ADMIN');

-- AlterTable
ALTER TABLE "User" DROP COLUMN "isAdmin",
ADD COLUMN     "role" "Role" NOT NULL DEFAULT 'USER';

-- CreateTable
CREATE TABLE "Result" (
    "testId" TEXT NOT NULL,
    "answers" TEXT[],
    "userId" UUID NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Result_testId_key" ON "Result"("testId");

-- CreateIndex
CREATE UNIQUE INDEX "Result_userId_key" ON "Result"("userId");

-- AddForeignKey
ALTER TABLE "Result" ADD CONSTRAINT "Result_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
