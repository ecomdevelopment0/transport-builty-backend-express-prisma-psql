-- CreateEnum
CREATE TYPE "Period" AS ENUM ('per_hour', 'per_day', 'per_week', 'per_month', 'per_year');

-- CreateEnum
CREATE TYPE "Status" AS ENUM ('available', 'unavailable', 'rented');

-- CreateEnum
CREATE TYPE "InvoiceStatus" AS ENUM ('paid', 'unpaid', 'partially_paid', 'overdue');

-- CreateTable
CREATE TABLE "admins" (
    "id" TEXT NOT NULL,
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

    CONSTRAINT "admins_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "blacklists" (
    "id" TEXT NOT NULL,
    "refresh_token" TEXT NOT NULL,
    "active_flag" BOOLEAN NOT NULL DEFAULT true,
    "delete_flag" BOOLEAN NOT NULL DEFAULT false,
    "modified_at" TIMESTAMP(3) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "created_by" TEXT,
    "modified_by" TEXT,

    CONSTRAINT "blacklists_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "firms" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "mobile" TEXT,
    "email" TEXT,
    "media" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "gst_number" TEXT,
    "address" TEXT,
    "city" TEXT,
    "state" TEXT,
    "country" TEXT,
    "pin_code" TEXT,
    "description" TEXT,
    "active_flag" BOOLEAN NOT NULL DEFAULT true,
    "delete_flag" BOOLEAN NOT NULL DEFAULT false,
    "modified_at" TIMESTAMP(3) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "created_by" TEXT,
    "modified_by" TEXT,

    CONSTRAINT "firms_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "owners" (
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

    CONSTRAINT "owners_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "payment_collections" (
    "id" TEXT NOT NULL,
    "rental_id" TEXT NOT NULL,
    "firm_id" TEXT NOT NULL,
    "payment_mode_id" TEXT NOT NULL,
    "amount" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "description" TEXT,
    "active_flag" BOOLEAN NOT NULL DEFAULT true,
    "delete_flag" BOOLEAN NOT NULL DEFAULT false,
    "modified_at" TIMESTAMP(3) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "created_by" TEXT,
    "modified_by" TEXT,

    CONSTRAINT "payment_collections_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "payment_modes" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "firm_id" TEXT,
    "active_flag" BOOLEAN NOT NULL DEFAULT true,
    "delete_flag" BOOLEAN NOT NULL DEFAULT false,
    "modified_at" TIMESTAMP(3) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "created_by" TEXT,
    "modified_by" TEXT,

    CONSTRAINT "payment_modes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "prefixes" (
    "id" TEXT NOT NULL,
    "object_type" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "start" INTEGER NOT NULL DEFAULT 0,
    "end" INTEGER NOT NULL DEFAULT 0,
    "current" INTEGER NOT NULL DEFAULT 0,
    "active_flag" BOOLEAN NOT NULL DEFAULT true,
    "delete_flag" BOOLEAN NOT NULL DEFAULT false,
    "modified_at" TIMESTAMP(3) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "created_by" TEXT,
    "modified_by" TEXT,

    CONSTRAINT "prefixes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "products" (
    "id" TEXT NOT NULL,
    "firm_id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "price" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "sales_price" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "fine" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "deposit" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "description" TEXT,
    "rental_period" "Period" NOT NULL DEFAULT 'per_hour',
    "fine_period" "Period" NOT NULL DEFAULT 'per_day',
    "color" TEXT,
    "type" TEXT,
    "barcode" TEXT,
    "brand" TEXT,
    "size" TEXT,
    "stock" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "current_rented_stock" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "keywords" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "media" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "status" "Status" NOT NULL DEFAULT 'available',
    "active_flag" BOOLEAN NOT NULL DEFAULT true,
    "delete_flag" BOOLEAN NOT NULL DEFAULT false,
    "modified_at" TIMESTAMP(3) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "created_by" TEXT,
    "modified_by" TEXT,

    CONSTRAINT "products_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "provider_configurations" (
    "id" TEXT NOT NULL,
    "provider_type" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "contact_number" TEXT,
    "email" TEXT,
    "identifier" TEXT,
    "url" TEXT,
    "type" TEXT,
    "user_name" TEXT,
    "password" TEXT,
    "client_id" TEXT,
    "client_password" TEXT,
    "api_key" TEXT,
    "api_secret" TEXT,
    "status" TEXT,
    "sender_details" JSONB,
    "outlet_reference" TEXT,
    "redirect_url" TEXT,
    "additional_properties" JSONB[] DEFAULT ARRAY[]::JSONB[],
    "sender_id" TEXT,
    "account_usage_type_id" TEXT,
    "access_key_id" TEXT,
    "secret_access_key" TEXT,
    "region" TEXT,
    "bucket" TEXT,
    "cdn" TEXT,
    "project_id" TEXT,
    "key_file_name" TEXT,
    "cloud_name" TEXT,
    "active_flag" BOOLEAN NOT NULL DEFAULT true,
    "delete_flag" BOOLEAN NOT NULL DEFAULT false,
    "created_by" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "modified_at" TIMESTAMP(3) NOT NULL,
    "modified_by" TEXT,

    CONSTRAINT "provider_configurations_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "rentals" (
    "id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "payment_mode_id" TEXT NOT NULL,
    "invoice_id" TEXT NOT NULL,
    "invoice_date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "invoice_status" "InvoiceStatus" NOT NULL DEFAULT 'unpaid',
    "rental_period" "Period" NOT NULL DEFAULT 'per_hour',
    "discount_amount" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "pending_amount" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "advance_amount" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "deposit_amount" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "paid_amount" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "total_amount" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "fine_amount" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "rental_products" JSONB[] DEFAULT ARRAY[]::JSONB[],
    "active_flag" BOOLEAN NOT NULL DEFAULT true,
    "delete_flag" BOOLEAN NOT NULL DEFAULT false,
    "created_by" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "modified_at" TIMESTAMP(3) NOT NULL,
    "modified_by" TEXT,

    CONSTRAINT "rentals_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "settings" (
    "id" TEXT NOT NULL,
    "is_sms_otp_mode_live" BOOLEAN NOT NULL DEFAULT false,
    "is_email_otp_mode_live" BOOLEAN NOT NULL DEFAULT false,
    "active_flag" BOOLEAN NOT NULL DEFAULT true,
    "delete_flag" BOOLEAN NOT NULL DEFAULT false,
    "modified_at" TIMESTAMP(3) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "created_by" TEXT,
    "modified_by" TEXT,

    CONSTRAINT "settings_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "subscriptions" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "price" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "validity" TEXT,
    "description" TEXT,
    "active_flag" BOOLEAN NOT NULL DEFAULT true,
    "delete_flag" BOOLEAN NOT NULL DEFAULT false,
    "modified_at" TIMESTAMP(3) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "created_by" TEXT,
    "modified_by" TEXT,

    CONSTRAINT "subscriptions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "templates" (
    "id" TEXT NOT NULL,
    "identifier" TEXT NOT NULL,
    "type" TEXT,
    "template_type" TEXT,
    "provider_name" TEXT,
    "name" TEXT,
    "subject" TEXT,
    "description" TEXT,
    "provider_template_code" TEXT,
    "template" TEXT,
    "instruction" TEXT,
    "parameters" INTEGER,
    "is_html" BOOLEAN NOT NULL DEFAULT false,
    "active_flag" BOOLEAN NOT NULL DEFAULT true,
    "delete_flag" BOOLEAN NOT NULL DEFAULT false,
    "modified_at" TIMESTAMP(3) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "created_by" TEXT,
    "modified_by" TEXT,

    CONSTRAINT "templates_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "terms_and_conditions" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "firm_id" TEXT NOT NULL,
    "description" TEXT,
    "active_flag" BOOLEAN NOT NULL DEFAULT true,
    "delete_flag" BOOLEAN NOT NULL DEFAULT false,
    "modified_at" TIMESTAMP(3) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "created_by" TEXT,
    "modified_by" TEXT,

    CONSTRAINT "terms_and_conditions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "users" (
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

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "blacklists_refresh_token_key" ON "blacklists"("refresh_token");

-- CreateIndex
CREATE UNIQUE INDEX "payment_modes_name_key" ON "payment_modes"("name");

-- CreateIndex
CREATE UNIQUE INDEX "prefixes_object_type_key" ON "prefixes"("object_type");

-- CreateIndex
CREATE UNIQUE INDEX "products_code_firm_id_key" ON "products"("code", "firm_id");

-- CreateIndex
CREATE UNIQUE INDEX "subscriptions_name_key" ON "subscriptions"("name");

-- CreateIndex
CREATE UNIQUE INDEX "templates_provider_name_identifier_key" ON "templates"("provider_name", "identifier");

-- AddForeignKey
ALTER TABLE "owners" ADD CONSTRAINT "owners_firm_id_fkey" FOREIGN KEY ("firm_id") REFERENCES "firms"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "payment_collections" ADD CONSTRAINT "payment_collections_firm_id_fkey" FOREIGN KEY ("firm_id") REFERENCES "firms"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "payment_collections" ADD CONSTRAINT "payment_collections_payment_mode_id_fkey" FOREIGN KEY ("payment_mode_id") REFERENCES "payment_modes"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "payment_collections" ADD CONSTRAINT "payment_collections_rental_id_fkey" FOREIGN KEY ("rental_id") REFERENCES "rentals"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "payment_modes" ADD CONSTRAINT "payment_modes_firm_id_fkey" FOREIGN KEY ("firm_id") REFERENCES "firms"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "products" ADD CONSTRAINT "products_firm_id_fkey" FOREIGN KEY ("firm_id") REFERENCES "firms"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "rentals" ADD CONSTRAINT "rentals_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "rentals" ADD CONSTRAINT "rentals_payment_mode_id_fkey" FOREIGN KEY ("payment_mode_id") REFERENCES "payment_modes"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "terms_and_conditions" ADD CONSTRAINT "terms_and_conditions_firm_id_fkey" FOREIGN KEY ("firm_id") REFERENCES "firms"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "users" ADD CONSTRAINT "users_firm_id_fkey" FOREIGN KEY ("firm_id") REFERENCES "firms"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
