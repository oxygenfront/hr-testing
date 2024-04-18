/*
  Warnings:

  - You are about to drop the `QuestionsOnTest` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "QuestionsOnTest" DROP CONSTRAINT "QuestionsOnTest_questionId_fkey";

-- DropForeignKey
ALTER TABLE "QuestionsOnTest" DROP CONSTRAINT "QuestionsOnTest_testId_fkey";

-- AlterTable
ALTER TABLE "Test" ADD COLUMN     "questionsIds" TEXT[];

-- DropTable
DROP TABLE "QuestionsOnTest";
