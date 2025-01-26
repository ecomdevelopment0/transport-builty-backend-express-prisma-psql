-- CreateTable
CREATE TABLE "Admins" (
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

    CONSTRAINT "Admins_pkey" PRIMARY KEY ("id")
);
