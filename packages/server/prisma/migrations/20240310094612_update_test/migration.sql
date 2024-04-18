/*
  Warnings:

  - You are about to drop the column `questionsIds` on the `Test` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Question" ADD COLUMN     "testId" UUID;

-- AlterTable
ALTER TABLE "Test" DROP COLUMN "questionsIds";

-- AddForeignKey
ALTER TABLE "Question" ADD CONSTRAINT "Question_testId_fkey" FOREIGN KEY ("testId") REFERENCES "Test"("id") ON DELETE SET NULL ON UPDATE CASCADE;
