/*
  Warnings:

  - Added the required column `succeedPercent` to the `TestResult` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Test" ADD COLUMN     "title" TEXT;

-- AlterTable
ALTER TABLE "TestResult" ADD COLUMN     "succeedPercent" DOUBLE PRECISION NOT NULL;
