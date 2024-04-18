-- DropIndex
DROP INDEX "TestResultFailedAnswer_questionId_key";

-- DropIndex
DROP INDEX "TestResultSucceedAnswer_questionId_key";

-- AlterTable
ALTER TABLE "TestResultFailedAnswer" ADD COLUMN     "id" UUID NOT NULL DEFAULT gen_random_uuid(),
ADD CONSTRAINT "TestResultFailedAnswer_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "TestResultSucceedAnswer" ADD COLUMN     "id" UUID NOT NULL DEFAULT gen_random_uuid(),
ADD CONSTRAINT "TestResultSucceedAnswer_pkey" PRIMARY KEY ("id");
