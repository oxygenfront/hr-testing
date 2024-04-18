/*
  Warnings:

  - You are about to drop the `_QuestionToTest` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_QuestionToTest" DROP CONSTRAINT "_QuestionToTest_A_fkey";

-- DropForeignKey
ALTER TABLE "_QuestionToTest" DROP CONSTRAINT "_QuestionToTest_B_fkey";

-- DropTable
DROP TABLE "_QuestionToTest";

-- CreateTable
CREATE TABLE "QuestionsOnTest" (
    "testId" UUID NOT NULL,
    "questionId" UUID NOT NULL,

    CONSTRAINT "QuestionsOnTest_pkey" PRIMARY KEY ("testId","questionId")
);

-- AddForeignKey
ALTER TABLE "QuestionsOnTest" ADD CONSTRAINT "QuestionsOnTest_testId_fkey" FOREIGN KEY ("testId") REFERENCES "Test"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "QuestionsOnTest" ADD CONSTRAINT "QuestionsOnTest_questionId_fkey" FOREIGN KEY ("questionId") REFERENCES "Question"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
