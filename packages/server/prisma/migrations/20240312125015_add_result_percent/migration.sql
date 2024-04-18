/*
  Warnings:

  - You are about to alter the column `succeedPercent` on the `TestResult` table. The data in that column could be lost. The data in that column will be cast from `DoublePrecision` to `Integer`.

*/
-- AlterTable
ALTER TABLE "TestResult" ALTER COLUMN "succeedPercent" SET DATA TYPE INTEGER;
