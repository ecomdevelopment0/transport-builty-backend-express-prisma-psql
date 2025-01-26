/*
  Warnings:

  - You are about to drop the column `dateOfBirth` on the `Products` table. All the data in the column will be lost.
  - You are about to drop the column `email` on the `Products` table. All the data in the column will be lost.
  - You are about to drop the column `entityId` on the `Products` table. All the data in the column will be lost.
  - You are about to drop the column `gender` on the `Products` table. All the data in the column will be lost.
  - You are about to drop the column `image` on the `Products` table. All the data in the column will be lost.
  - You are about to drop the column `languages` on the `Products` table. All the data in the column will be lost.
  - You are about to drop the column `mobile` on the `Products` table. All the data in the column will be lost.
  - You are about to drop the column `pickerId` on the `Products` table. All the data in the column will be lost.
  - The `status` column on the `Products` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - A unique constraint covering the columns `[code,firmId]` on the table `Products` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `code` to the `Products` table without a default value. This is not possible if the table is not empty.
  - Added the required column `firmId` to the `Products` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "RentalPeriod" AS ENUM ('RentPerHour', 'RentPerDay', 'RentPerWeek', 'RentPerMonth', 'RentPerYear');

-- CreateEnum
CREATE TYPE "FinePeriod" AS ENUM ('FinePerHour', 'FinePerDay', 'FinePerWeek', 'FinePerMonth', 'FinePerYear');

-- CreateEnum
CREATE TYPE "Status" AS ENUM ('Available', 'Unavailable', 'Rented');

-- AlterTable
ALTER TABLE "Products" DROP COLUMN "dateOfBirth",
DROP COLUMN "email",
DROP COLUMN "entityId",
DROP COLUMN "gender",
DROP COLUMN "image",
DROP COLUMN "languages",
DROP COLUMN "mobile",
DROP COLUMN "pickerId",
ADD COLUMN     "barcode" TEXT,
ADD COLUMN     "brand" TEXT,
ADD COLUMN     "categoryId" TEXT,
ADD COLUMN     "code" TEXT NOT NULL,
ADD COLUMN     "color" TEXT,
ADD COLUMN     "currentRentedStock" DOUBLE PRECISION NOT NULL DEFAULT 0,
ADD COLUMN     "deposit" DOUBLE PRECISION NOT NULL DEFAULT 0,
ADD COLUMN     "fine" DOUBLE PRECISION NOT NULL DEFAULT 0,
ADD COLUMN     "finePeriod" "FinePeriod" NOT NULL DEFAULT 'FinePerDay',
ADD COLUMN     "firmId" TEXT NOT NULL,
ADD COLUMN     "keywords" TEXT[] DEFAULT ARRAY[]::TEXT[],
ADD COLUMN     "media" TEXT[] DEFAULT ARRAY[]::TEXT[],
ADD COLUMN     "price" DOUBLE PRECISION NOT NULL DEFAULT 0,
ADD COLUMN     "rentalPeriod" "RentalPeriod" NOT NULL DEFAULT 'RentPerHour',
ADD COLUMN     "salesPrice" DOUBLE PRECISION NOT NULL DEFAULT 0,
ADD COLUMN     "size" TEXT,
ADD COLUMN     "stock" DOUBLE PRECISION NOT NULL DEFAULT 0,
ADD COLUMN     "type" TEXT,
DROP COLUMN "status",
ADD COLUMN     "status" "Status" NOT NULL DEFAULT 'Available',
ALTER COLUMN "description" DROP NOT NULL;

-- CreateTable
CREATE TABLE "Blacklists" (
    "id" TEXT NOT NULL,
    "refreshToken" TEXT NOT NULL,
    "activeFlag" BOOLEAN NOT NULL DEFAULT true,
    "deleteFlag" BOOLEAN NOT NULL DEFAULT false,
    "createdBy" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "modifiedAt" TIMESTAMP(3) NOT NULL,
    "modifiedBy" TEXT,

    CONSTRAINT "Blacklists_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Buyers" (
    "id" TEXT NOT NULL,
    "fullName" TEXT,
    "phone" TEXT,
    "email" TEXT,
    "image" TEXT,
    "username" TEXT,
    "alternatePhone" TEXT,
    "address" TEXT,
    "documents" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "city" TEXT,
    "state" TEXT,
    "country" TEXT,
    "pincode" TEXT,
    "adhaarNumber" TEXT,
    "drivingLicenseNumber" TEXT,
    "activeFlag" BOOLEAN NOT NULL DEFAULT true,
    "deleteFlag" BOOLEAN NOT NULL DEFAULT false,
    "modifiedAt" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "createdBy" TEXT,
    "modifiedBy" TEXT,

    CONSTRAINT "Buyers_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Categories" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "isAutoIncrementForProductCode" BOOLEAN NOT NULL DEFAULT false,
    "activeFlag" BOOLEAN NOT NULL DEFAULT true,
    "deleteFlag" BOOLEAN NOT NULL DEFAULT false,
    "modifiedAt" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "createdBy" TEXT,
    "modifiedBy" TEXT,

    CONSTRAINT "Categories_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Firms" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "media" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "gstn" TEXT,
    "address" TEXT,
    "city" TEXT,
    "state" TEXT,
    "country" TEXT,
    "pincode" TEXT,
    "phone" TEXT,
    "email" TEXT,
    "description" TEXT,
    "activeFlag" BOOLEAN NOT NULL DEFAULT true,
    "deleteFlag" BOOLEAN NOT NULL DEFAULT false,
    "modifiedAt" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "createdBy" TEXT,
    "modifiedBy" TEXT,

    CONSTRAINT "Firms_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PaymentCollections" (
    "id" TEXT NOT NULL,
    "amount" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "rentalId" TEXT NOT NULL,
    "firmId" TEXT NOT NULL,
    "paymentModeId" TEXT NOT NULL,
    "description" TEXT,

    CONSTRAINT "PaymentCollections_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PaymentModes" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "rentalId" TEXT NOT NULL,
    "firmId" TEXT NOT NULL,
    "activeFlag" BOOLEAN NOT NULL DEFAULT true,
    "deleteFlag" BOOLEAN NOT NULL DEFAULT false,
    "createdBy" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "modifiedAt" TIMESTAMP(3) NOT NULL,
    "modifiedBy" TEXT,

    CONSTRAINT "PaymentModes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Permissions" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "roleId" TEXT,
    "description" TEXT,
    "activeFlag" BOOLEAN NOT NULL DEFAULT true,
    "deleteFlag" BOOLEAN NOT NULL DEFAULT false,
    "modifiedAt" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "createdBy" TEXT,
    "modifiedBy" TEXT,

    CONSTRAINT "Permissions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Prefixes" (
    "id" TEXT NOT NULL,
    "objectType" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "start" INTEGER NOT NULL DEFAULT 0,
    "end" INTEGER NOT NULL DEFAULT 0,
    "current" INTEGER NOT NULL DEFAULT 0,
    "activeFlag" BOOLEAN NOT NULL DEFAULT true,
    "deleteFlag" BOOLEAN NOT NULL DEFAULT false,
    "createdBy" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "modifiedAt" TIMESTAMP(3) NOT NULL,
    "modifiedBy" TEXT,

    CONSTRAINT "Prefixes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "RentalProducts" (
    "id" TEXT NOT NULL,
    "rentalId" TEXT,
    "productId" TEXT NOT NULL,
    "startDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "endDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "status" "Status" NOT NULL DEFAULT 'Rented',
    "media" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "salesPrice" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "activeFlag" BOOLEAN NOT NULL DEFAULT true,
    "deleteFlag" BOOLEAN NOT NULL DEFAULT false,
    "createdBy" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "modifiedAt" TIMESTAMP(3) NOT NULL,
    "modifiedBy" TEXT,

    CONSTRAINT "RentalProducts_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Rentals" (
    "id" TEXT NOT NULL,
    "buyerId" TEXT NOT NULL,
    "status" "Status" NOT NULL DEFAULT 'Rented',
    "media" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "salesPrice" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "discount" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "deposit" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "paidAmount" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "totalAmount" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "fine" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "rentalPeriod" "RentalPeriod" NOT NULL DEFAULT 'RentPerHour',
    "activeFlag" BOOLEAN NOT NULL DEFAULT true,
    "deleteFlag" BOOLEAN NOT NULL DEFAULT false,
    "createdBy" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "modifiedAt" TIMESTAMP(3) NOT NULL,
    "modifiedBy" TEXT,

    CONSTRAINT "Rentals_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Roles" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "activeFlag" BOOLEAN NOT NULL DEFAULT true,
    "deleteFlag" BOOLEAN NOT NULL DEFAULT false,
    "modifiedAt" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "createdBy" TEXT,
    "modifiedBy" TEXT,

    CONSTRAINT "Roles_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Sellers" (
    "id" TEXT NOT NULL,
    "fullName" TEXT,
    "phone" TEXT,
    "email" TEXT,
    "image" TEXT,
    "username" TEXT,
    "alternatePhone" TEXT,
    "isOwner" BOOLEAN NOT NULL DEFAULT false,
    "address" TEXT,
    "documents" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "city" TEXT,
    "state" TEXT,
    "country" TEXT,
    "pincode" TEXT,
    "adhaarNumber" TEXT,
    "drivingLicenseNumber" TEXT,
    "activeFlag" BOOLEAN NOT NULL DEFAULT true,
    "deleteFlag" BOOLEAN NOT NULL DEFAULT false,
    "modifiedAt" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "createdBy" TEXT,
    "modifiedBy" TEXT,

    CONSTRAINT "Sellers_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Subscriptions" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "price" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "validity" TEXT,
    "description" TEXT,
    "activeFlag" BOOLEAN NOT NULL DEFAULT true,
    "deleteFlag" BOOLEAN NOT NULL DEFAULT false,
    "createdBy" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "modifiedAt" TIMESTAMP(3) NOT NULL,
    "modifiedBy" TEXT,

    CONSTRAINT "Subscriptions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TermsAndConditions" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "firmId" TEXT NOT NULL,
    "description" TEXT,
    "activeFlag" BOOLEAN NOT NULL DEFAULT true,
    "deleteFlag" BOOLEAN NOT NULL DEFAULT false,
    "modifiedAt" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "createdBy" TEXT,
    "modifiedBy" TEXT,

    CONSTRAINT "TermsAndConditions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_CategoriesToFirms" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,

    CONSTRAINT "_CategoriesToFirms_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE UNIQUE INDEX "Blacklists_refreshToken_key" ON "Blacklists"("refreshToken");

-- CreateIndex
CREATE UNIQUE INDEX "Categories_name_key" ON "Categories"("name");

-- CreateIndex
CREATE UNIQUE INDEX "PaymentModes_name_key" ON "PaymentModes"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Permissions_name_key" ON "Permissions"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Prefixes_objectType_key" ON "Prefixes"("objectType");

-- CreateIndex
CREATE UNIQUE INDEX "Subscriptions_name_key" ON "Subscriptions"("name");

-- CreateIndex
CREATE INDEX "_CategoriesToFirms_B_index" ON "_CategoriesToFirms"("B");

-- CreateIndex
CREATE UNIQUE INDEX "Products_code_firmId_key" ON "Products"("code", "firmId");

-- AddForeignKey
ALTER TABLE "PaymentCollections" ADD CONSTRAINT "PaymentCollections_rentalId_fkey" FOREIGN KEY ("rentalId") REFERENCES "Rentals"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PaymentCollections" ADD CONSTRAINT "PaymentCollections_firmId_fkey" FOREIGN KEY ("firmId") REFERENCES "Firms"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PaymentCollections" ADD CONSTRAINT "PaymentCollections_paymentModeId_fkey" FOREIGN KEY ("paymentModeId") REFERENCES "PaymentModes"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PaymentModes" ADD CONSTRAINT "PaymentModes_rentalId_fkey" FOREIGN KEY ("rentalId") REFERENCES "Rentals"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PaymentModes" ADD CONSTRAINT "PaymentModes_firmId_fkey" FOREIGN KEY ("firmId") REFERENCES "Firms"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Permissions" ADD CONSTRAINT "Permissions_roleId_fkey" FOREIGN KEY ("roleId") REFERENCES "Roles"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Products" ADD CONSTRAINT "Products_firmId_fkey" FOREIGN KEY ("firmId") REFERENCES "Firms"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Products" ADD CONSTRAINT "Products_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "Categories"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RentalProducts" ADD CONSTRAINT "RentalProducts_rentalId_fkey" FOREIGN KEY ("rentalId") REFERENCES "Rentals"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RentalProducts" ADD CONSTRAINT "RentalProducts_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Products"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Rentals" ADD CONSTRAINT "Rentals_buyerId_fkey" FOREIGN KEY ("buyerId") REFERENCES "Buyers"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TermsAndConditions" ADD CONSTRAINT "TermsAndConditions_firmId_fkey" FOREIGN KEY ("firmId") REFERENCES "Firms"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CategoriesToFirms" ADD CONSTRAINT "_CategoriesToFirms_A_fkey" FOREIGN KEY ("A") REFERENCES "Categories"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CategoriesToFirms" ADD CONSTRAINT "_CategoriesToFirms_B_fkey" FOREIGN KEY ("B") REFERENCES "Firms"("id") ON DELETE CASCADE ON UPDATE CASCADE;
