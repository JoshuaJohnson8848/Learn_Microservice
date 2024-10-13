-- CreateTable
CREATE TABLE "categories" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(50) NOT NULL,
    "desc" VARCHAR(250) NOT NULL,

    CONSTRAINT "categories_pkey" PRIMARY KEY ("id")
);
