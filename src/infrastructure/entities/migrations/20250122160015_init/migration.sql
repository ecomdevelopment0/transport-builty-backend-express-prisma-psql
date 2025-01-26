-- CreateTable
CREATE TABLE "Products" (
    "id" TEXT NOT NULL,
    "entityId" TEXT NOT NULL,
    "pickerId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "mobile" TEXT NOT NULL,
    "gender" TEXT NOT NULL,
    "dateOfBirth" TEXT NOT NULL,
    "image" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "languages" TEXT[],
    "activeFlag" BOOLEAN NOT NULL DEFAULT true,
    "deleteFlag" BOOLEAN NOT NULL DEFAULT false,
    "modifiedAt" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "createdBy" TEXT,
    "modifiedBy" TEXT,

    CONSTRAINT "Products_pkey" PRIMARY KEY ("id")
);
