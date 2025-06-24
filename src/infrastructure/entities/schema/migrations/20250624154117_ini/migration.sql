/*
  Warnings:

  - You are about to drop the column `amount` on the `charges` table. All the data in the column will be lost.
  - You are about to drop the column `gst_percentage` on the `charges` table. All the data in the column will be lost.
  - You are about to drop the column `taxable_amount` on the `charges` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "charges" DROP COLUMN "amount",
DROP COLUMN "gst_percentage",
DROP COLUMN "taxable_amount";
