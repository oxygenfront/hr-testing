/*
  Warnings:

  - You are about to drop the column `correctAnswersCount` on the `TestResult` table. All the data in the column will be lost.
  - You are about to drop the column `wrongAnswersCount` on the `TestResult` table. All the data in the column will be lost.
  - You are about to drop the `TestResultCorrectAnswer` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `TestResultWrongAnswer` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `failedAnswersCount` to the `TestResult` table without a default value. This is not possible if the table is not empty.
  - Added the required column `succeedAnswersCount` to the `TestResult` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "TestResultCorrectAnswer" DROP CONSTRAINT "TestResultCorrectAnswer_testResultId_fkey";

-- DropForeignKey
ALTER TABLE "TestResultWrongAnswer" DROP CONSTRAINT "TestResultWrongAnswer_testResultId_fkey";

-- AlterTable
ALTER TABLE "TestResult" DROP COLUMN "correctAnswersCount",
DROP COLUMN "wrongAnswersCount",
ADD COLUMN     "failedAnswersCount" INTEGER NOT NULL,
ADD COLUMN     "succeedAnswersCount" INTEGER NOT NULL;

-- DropTable
DROP TABLE "TestResultCorrectAnswer";

-- DropTable
DROP TABLE "TestResultWrongAnswer";

-- CreateTable
CREATE TABLE "TestResultSucceedAnswer" (
    "questionId" TEXT NOT NULL,
    "selectedAnswers" TEXT[],
    "testResultId" UUID NOT NULL
);

-- CreateTable
CREATE TABLE "TestResultFailedAnswer" (
    "questionId" TEXT NOT NULL,
    "correctAnswers" TEXT[],
    "selectedAnswers" TEXT[],
    "testResultId" UUID NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "TestResultSucceedAnswer_questionId_key" ON "TestResultSucceedAnswer"("questionId");

-- CreateIndex
CREATE UNIQUE INDEX "TestResultFailedAnswer_questionId_key" ON "TestResultFailedAnswer"("questionId");

-- AddForeignKey
ALTER TABLE "TestResultSucceedAnswer" ADD CONSTRAINT "TestResultSucceedAnswer_testResultId_fkey" FOREIGN KEY ("testResultId") REFERENCES "TestResult"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TestResultFailedAnswer" ADD CONSTRAINT "TestResultFailedAnswer_testResultId_fkey" FOREIGN KEY ("testResultId") REFERENCES "TestResult"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
