-- DropForeignKey
ALTER TABLE "TestResult" DROP CONSTRAINT "TestResult_userResultId_fkey";

-- DropForeignKey
ALTER TABLE "TestResultFailedAnswer" DROP CONSTRAINT "TestResultFailedAnswer_testResultId_fkey";

-- DropForeignKey
ALTER TABLE "TestResultSucceedAnswer" DROP CONSTRAINT "TestResultSucceedAnswer_testResultId_fkey";

-- AddForeignKey
ALTER TABLE "TestResultSucceedAnswer" ADD CONSTRAINT "TestResultSucceedAnswer_testResultId_fkey" FOREIGN KEY ("testResultId") REFERENCES "TestResult"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TestResultFailedAnswer" ADD CONSTRAINT "TestResultFailedAnswer_testResultId_fkey" FOREIGN KEY ("testResultId") REFERENCES "TestResult"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TestResult" ADD CONSTRAINT "TestResult_userResultId_fkey" FOREIGN KEY ("userResultId") REFERENCES "UserResult"("id") ON DELETE CASCADE ON UPDATE CASCADE;
