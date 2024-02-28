-- CreateTable
CREATE TABLE "something" (
    "some_id" SERIAL NOT NULL,
    "somename" TEXT NOT NULL,
    "somelut" TEXT NOT NULL,
    "somer" TEXT NOT NULL,
    "someaddress" TEXT NOT NULL,

    CONSTRAINT "something_pkey" PRIMARY KEY ("some_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "something_some_id_key" ON "something"("some_id");

-- CreateIndex
CREATE UNIQUE INDEX "something_somelut_key" ON "something"("somelut");
