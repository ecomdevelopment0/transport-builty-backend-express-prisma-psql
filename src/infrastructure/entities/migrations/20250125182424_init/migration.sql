/*
  Warnings:

  - You are about to drop the column `rentalId` on the `PaymentModes` table. All the data in the column will be lost.
  - You are about to drop the column `roleId` on the `Permissions` table. All the data in the column will be lost.
  - You are about to drop the column `deposit` on the `Rentals` table. All the data in the column will be lost.
  - You are about to drop the column `discount` on the `Rentals` table. All the data in the column will be lost.
  - You are about to drop the column `fine` on the `Rentals` table. All the data in the column will be lost.
  - You are about to drop the column `status` on the `Rentals` table. All the data in the column will be lost.
  - Added the required column `modifiedAt` to the `PaymentCollections` table without a default value. This is not possible if the table is not empty.
  - Added the required column `paymentModeId` to the `Rentals` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "InvoiceStatus" AS ENUM ('Paid', 'Unpaid', 'PartiallyPaid', 'Overdue');

-- DropForeignKey
ALTER TABLE "PaymentModes" DROP CONSTRAINT "PaymentModes_firmId_fkey";

-- DropForeignKey
ALTER TABLE "PaymentModes" DROP CONSTRAINT "PaymentModes_rentalId_fkey";

-- DropForeignKey
ALTER TABLE "Permissions" DROP CONSTRAINT "Permissions_roleId_fkey";

-- AlterTable
ALTER TABLE "PaymentCollections" ADD COLUMN     "activeFlag" BOOLEAN NOT NULL DEFAULT true,
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "createdBy" TEXT,
ADD COLUMN     "deleteFlag" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "modifiedAt" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "modifiedBy" TEXT;

-- AlterTable
ALTER TABLE "PaymentModes" DROP COLUMN "rentalId",
ALTER COLUMN "firmId" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Permissions" DROP COLUMN "roleId";

-- AlterTable
ALTER TABLE "Rentals" DROP COLUMN "deposit",
DROP COLUMN "discount",
DROP COLUMN "fine",
DROP COLUMN "status",
ADD COLUMN     "advanceAmount" DOUBLE PRECISION NOT NULL DEFAULT 0,
ADD COLUMN     "depositAmount" DOUBLE PRECISION NOT NULL DEFAULT 0,
ADD COLUMN     "discountAmount" DOUBLE PRECISION NOT NULL DEFAULT 0,
ADD COLUMN     "fineAmount" DOUBLE PRECISION NOT NULL DEFAULT 0,
ADD COLUMN     "invoiceDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "invoiceNumber" TEXT,
ADD COLUMN     "invoiceStatus" "InvoiceStatus" NOT NULL DEFAULT 'PartiallyPaid',
ADD COLUMN     "paymentModeId" TEXT NOT NULL,
ADD COLUMN     "pendingAmount" DOUBLE PRECISION NOT NULL DEFAULT 0;

-- AlterTable
ALTER TABLE "Roles" ADD COLUMN     "permissions" TEXT[];

-- AddForeignKey
ALTER TABLE "PaymentModes" ADD CONSTRAINT "PaymentModes_firmId_fkey" FOREIGN KEY ("firmId") REFERENCES "Firms"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Rentals" ADD CONSTRAINT "Rentals_paymentModeId_fkey" FOREIGN KEY ("paymentModeId") REFERENCES "PaymentModes"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
