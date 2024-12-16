-- CreateEnum
CREATE TYPE "Category" AS ENUM ('MEN', 'WOMEN', 'ACCESSORIES', 'NEW_ARRIVALS', 'SALE', 'PLUS_SIZE', 'MATERIALS');

-- CreateEnum
CREATE TYPE "Season" AS ENUM ('SPRING_SUMMER', 'DEMI_SEASON', 'WINTER');

-- CreateTable
CREATE TABLE "Product" (
    "id" SERIAL NOT NULL,
    "category" "Category" NOT NULL,
    "name" TEXT,
    "description" TEXT,
    "season" "Season",
    "brand" TEXT,
    "price" DOUBLE PRECISION NOT NULL,
    "discount" DOUBLE PRECISION,
    "color" TEXT,
    "size" TEXT,
    "insulation" TEXT,
    "imageUrl" TEXT,
    "length" TEXT,
    "storeIds" INTEGER[],
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Product_pkey" PRIMARY KEY ("id")
);
