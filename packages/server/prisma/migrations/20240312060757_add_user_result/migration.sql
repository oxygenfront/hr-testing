-- CreateTable
CREATE TABLE "TestResultCorrectAnswer" (
    "questionId" TEXT NOT NULL,
    "selectedAnswers" TEXT[],
    "testResultId" UUID NOT NULL
);

-- CreateTable
CREATE TABLE "TestResultWrongAnswer" (
    "questionId" TEXT NOT NULL,
    "correctAnswers" TEXT[],
    "selectedAnswers" TEXT[],
    "testResultId" UUID NOT NULL
);

-- CreateTable
CREATE TABLE "TestResult" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "correctAnswersCount" INTEGER NOT NULL,
    "wrongAnswersCount" INTEGER NOT NULL,
    "userResultId" UUID NOT NULL,

    CONSTRAINT "TestResult_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UserResult" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "userId" TEXT NOT NULL,
    "testId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "UserResult_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "TestResultCorrectAnswer_questionId_key" ON "TestResultCorrectAnswer"("questionId");

-- CreateIndex
CREATE UNIQUE INDEX "TestResultWrongAnswer_questionId_key" ON "TestResultWrongAnswer"("questionId");

-- CreateIndex
CREATE UNIQUE INDEX "TestResult_userResultId_key" ON "TestResult"("userResultId");

-- CreateIndex
CREATE UNIQUE INDEX "UserResult_userId_key" ON "UserResult"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "UserResult_testId_key" ON "UserResult"("testId");

-- AddForeignKey
ALTER TABLE "TestResultCorrectAnswer" ADD CONSTRAINT "TestResultCorrectAnswer_testResultId_fkey" FOREIGN KEY ("testResultId") REFERENCES "TestResult"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TestResultWrongAnswer" ADD CONSTRAINT "TestResultWrongAnswer_testResultId_fkey" FOREIGN KEY ("testResultId") REFERENCES "TestResult"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TestResult" ADD CONSTRAINT "TestResult_userResultId_fkey" FOREIGN KEY ("userResultId") REFERENCES "UserResult"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
