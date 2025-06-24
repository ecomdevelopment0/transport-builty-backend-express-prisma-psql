/*
  Warnings:

  - The values [rented] on the enum `Status` will be removed. If these variants are still used in the database, this will fail.
  - You are about to drop the column `current_rented_stock` on the `products` table. All the data in the column will be lost.
  - You are about to drop the column `fine_period` on the `products` table. All the data in the column will be lost.
  - You are about to drop the column `price` on the `products` table. All the data in the column will be lost.
  - You are about to drop the column `rental_period` on the `products` table. All the data in the column will be lost.
  - You are about to drop the column `sales_price` on the `products` table. All the data in the column will be lost.
  - You are about to drop the `rentals` table. If the table is not empty, all the data it contains will be lost.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "Status_new" AS ENUM ('available', 'unavailable');
ALTER TABLE "products" ALTER COLUMN "status" DROP DEFAULT;
ALTER TABLE "products" ALTER COLUMN "status" TYPE "Status_new" USING ("status"::text::"Status_new");
ALTER TYPE "Status" RENAME TO "Status_old";
ALTER TYPE "Status_new" RENAME TO "Status";
DROP TYPE "Status_old";
ALTER TABLE "products" ALTER COLUMN "status" SET DEFAULT 'available';
COMMIT;

-- DropForeignKey
ALTER TABLE "payment_collections" DROP CONSTRAINT "payment_collections_rental_id_fkey";

-- DropForeignKey
ALTER TABLE "rentals" DROP CONSTRAINT "rentals_payment_mode_id_fkey";

-- DropForeignKey
ALTER TABLE "rentals" DROP CONSTRAINT "rentals_user_id_fkey";

-- AlterTable
ALTER TABLE "customers" ADD COLUMN     "gst_number" TEXT,
ADD COLUMN     "media" TEXT[] DEFAULT ARRAY[]::TEXT[],
ADD COLUMN     "pan_card_number" TEXT,
ADD COLUMN     "type" TEXT;

-- AlterTable
ALTER TABLE "firms" ADD COLUMN     "mobile_1" TEXT,
ADD COLUMN     "mobile_2" TEXT,
ADD COLUMN     "mobile_3" TEXT,
ADD COLUMN     "pan_card_number" TEXT,
ADD COLUMN     "website" TEXT;

-- AlterTable
ALTER TABLE "products" DROP COLUMN "current_rented_stock",
DROP COLUMN "fine_period",
DROP COLUMN "price",
DROP COLUMN "rental_period",
DROP COLUMN "sales_price",
ADD COLUMN     "mrp" DOUBLE PRECISION NOT NULL DEFAULT 0,
ADD COLUMN     "number_of_packs" DOUBLE PRECISION NOT NULL DEFAULT 0,
ADD COLUMN     "rate" DOUBLE PRECISION NOT NULL DEFAULT 0,
ADD COLUMN     "unit" TEXT,
ADD COLUMN     "weight" DOUBLE PRECISION NOT NULL DEFAULT 0;

-- DropTable
DROP TABLE "rentals";

-- DropEnum
DROP TYPE "Period";

-- CreateTable
CREATE TABLE "charges" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "firm_id" TEXT NOT NULL,
    "description" TEXT,
    "taxable_amount" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "gst_percentage" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "amount" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "active_flag" BOOLEAN NOT NULL DEFAULT true,
    "delete_flag" BOOLEAN NOT NULL DEFAULT false,
    "modified_at" TIMESTAMP(3) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "created_by" TEXT,
    "modified_by" TEXT,

    CONSTRAINT "charges_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "invoices" (
    "id" TEXT NOT NULL,
    "to_customer_id" TEXT,
    "from_customer_id" TEXT,
    "payment_mode_id" TEXT,
    "invoice_id" TEXT,
    "invoice_date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "invoice_status" "InvoiceStatus" NOT NULL DEFAULT 'unpaid',
    "transport_details" JSONB,
    "charges" JSONB[] DEFAULT ARRAY[]::JSONB[],
    "is_opted_for_insurance" BOOLEAN NOT NULL DEFAULT false,
    "goods_value" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "demurrage_day" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "demurrage_charges" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "advance_amount" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "payable_amount" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "total_amount" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "products" JSONB[] DEFAULT ARRAY[]::JSONB[],
    "signature" TEXT,
    "active_flag" BOOLEAN NOT NULL DEFAULT true,
    "delete_flag" BOOLEAN NOT NULL DEFAULT false,
    "created_by" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "modified_at" TIMESTAMP(3) NOT NULL,
    "modified_by" TEXT,

    CONSTRAINT "invoices_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "charges" ADD CONSTRAINT "charges_firm_id_fkey" FOREIGN KEY ("firm_id") REFERENCES "firms"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "invoices" ADD CONSTRAINT "invoices_to_customer_id_fkey" FOREIGN KEY ("to_customer_id") REFERENCES "customers"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "invoices" ADD CONSTRAINT "invoices_from_customer_id_fkey" FOREIGN KEY ("from_customer_id") REFERENCES "customers"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "invoices" ADD CONSTRAINT "invoices_payment_mode_id_fkey" FOREIGN KEY ("payment_mode_id") REFERENCES "payment_modes"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "payment_collections" ADD CONSTRAINT "payment_collections_rental_id_fkey" FOREIGN KEY ("rental_id") REFERENCES "invoices"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
