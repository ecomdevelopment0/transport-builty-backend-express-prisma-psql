/*
  Warnings:

  - You are about to drop the `users` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[name,provider_type]` on the table `provider_configurations` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "rentals" DROP CONSTRAINT "rentals_user_id_fkey";

-- DropForeignKey
ALTER TABLE "users" DROP CONSTRAINT "users_firm_id_fkey";

-- DropTable
DROP TABLE "users";

-- CreateTable
CREATE TABLE "customers" (
    "id" TEXT NOT NULL,
    "firm_id" TEXT NOT NULL,
    "full_name" TEXT,
    "mobile" TEXT,
    "email" TEXT,
    "image" TEXT,
    "username" TEXT,
    "alternate_mobile" TEXT,
    "address" TEXT,
    "documents" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "city" TEXT,
    "state" TEXT,
    "country" TEXT,
    "pin_code" TEXT,
    "adhaar_number" TEXT,
    "driving_license_number" TEXT,
    "active_flag" BOOLEAN NOT NULL DEFAULT true,
    "delete_flag" BOOLEAN NOT NULL DEFAULT false,
    "modified_at" TIMESTAMP(3) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "created_by" TEXT,
    "modified_by" TEXT,

    CONSTRAINT "customers_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "provider_configurations_name_provider_type_key" ON "provider_configurations"("name", "provider_type");

-- AddForeignKey
ALTER TABLE "customers" ADD CONSTRAINT "customers_firm_id_fkey" FOREIGN KEY ("firm_id") REFERENCES "firms"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "rentals" ADD CONSTRAINT "rentals_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "customers"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
