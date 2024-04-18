-- CreateTable
CREATE TABLE "Test" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "variant" SERIAL NOT NULL,

    CONSTRAINT "Test_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_QuestionToTest" (
    "A" UUID NOT NULL,
    "B" UUID NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_QuestionToTest_AB_unique" ON "_QuestionToTest"("A", "B");

-- CreateIndex
CREATE INDEX "_QuestionToTest_B_index" ON "_QuestionToTest"("B");

-- AddForeignKey
ALTER TABLE "_QuestionToTest" ADD CONSTRAINT "_QuestionToTest_A_fkey" FOREIGN KEY ("A") REFERENCES "Question"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_QuestionToTest" ADD CONSTRAINT "_QuestionToTest_B_fkey" FOREIGN KEY ("B") REFERENCES "Test"("id") ON DELETE CASCADE ON UPDATE CASCADE;
