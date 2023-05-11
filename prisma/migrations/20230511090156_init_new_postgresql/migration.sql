-- CreateEnum
CREATE TYPE "ProductStatus" AS ENUM ('AVAILABLE', 'LOW_STOCK', 'OUT_OF_STOCK', 'ARCHIVED');

-- CreateEnum
CREATE TYPE "Discount_Status" AS ENUM ('ACTIVE', 'INACTIVE');

-- CreateEnum
CREATE TYPE "GenderType" AS ENUM ('male', 'female');

-- CreateEnum
CREATE TYPE "Acc_status" AS ENUM ('ACTIVE', 'SUSPENDED', 'DELETED');

-- CreateEnum
CREATE TYPE "CardType" AS ENUM ('CREDIT', 'DEBIT');

-- CreateEnum
CREATE TYPE "OrderTransactionStatus" AS ENUM ('CANCELED', 'FAILED', 'PENDING', 'REJECTED', 'DECLINED', 'SUCCESSFUL');

-- CreateEnum
CREATE TYPE "StatusType" AS ENUM ('CANCELED', 'PENDING', 'REJECTED', 'DELIVERED');

-- CreateEnum
CREATE TYPE "AdminType" AS ENUM ('admin', 'manager', 'staff');

-- CreateTable
CREATE TABLE "Product" (
    "id" TEXT NOT NULL,
    "title" VARCHAR(75) NOT NULL,
    "image" VARCHAR(100) NOT NULL,
    "description" TEXT NOT NULL,
    "showing_instruction" TEXT NOT NULL,
    "bloom_size" VARCHAR(75) NOT NULL,
    "type_id" TEXT NOT NULL,
    "color_id" TEXT NOT NULL,
    "family_id" TEXT NOT NULL,
    "cost_price" DOUBLE PRECISION NOT NULL,
    "selling_price" DOUBLE PRECISION NOT NULL,
    "inventory" INTEGER NOT NULL,
    "sku" INTEGER NOT NULL,
    "discount_id" TEXT,
    "admin_id" TEXT NOT NULL,
    "status" "ProductStatus" NOT NULL DEFAULT 'OUT_OF_STOCK',
    "create_at" DATE NOT NULL,
    "modified_at" DATE,
    "deleted_at" DATE,

    CONSTRAINT "Product_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Category" (
    "id" TEXT NOT NULL,
    "name" VARCHAR(100) NOT NULL,
    "description" TEXT NOT NULL,
    "create_at" DATE NOT NULL,
    "modified_at" DATE,
    "deleted_at" DATE,

    CONSTRAINT "Category_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Flower_Family" (
    "id" TEXT NOT NULL,
    "name" VARCHAR(75) NOT NULL,
    "description" TEXT,
    "create_at" DATE NOT NULL,
    "modified_at" DATE,
    "deleted_at" DATE,

    CONSTRAINT "Flower_Family_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Seasonal_Information" (
    "id" TEXT NOT NULL,
    "name" VARCHAR(75) NOT NULL,
    "description" TEXT,
    "create_at" DATE NOT NULL,
    "modified_at" DATE,
    "deleted_at" DATE,

    CONSTRAINT "Seasonal_Information_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Flower_Type" (
    "id" TEXT NOT NULL,
    "name" VARCHAR(75) NOT NULL,
    "description" TEXT,
    "create_at" DATE NOT NULL,
    "modified_at" DATE,
    "deleted_at" DATE,

    CONSTRAINT "Flower_Type_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Flower_Color" (
    "id" TEXT NOT NULL,
    "name" VARCHAR(75) NOT NULL,
    "description" TEXT,
    "create_at" DATE NOT NULL,
    "modified_at" DATE,
    "deleted_at" DATE,

    CONSTRAINT "Flower_Color_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Discount" (
    "id" TEXT NOT NULL,
    "name" VARCHAR(75) NOT NULL,
    "description" TEXT,
    "discount_precent" DOUBLE PRECISION NOT NULL,
    "status" "Discount_Status" NOT NULL DEFAULT 'INACTIVE',
    "create_at" DATE NOT NULL,
    "modified_at" DATE,
    "deleted_at" DATE,

    CONSTRAINT "Discount_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Product_Review" (
    "id" TEXT NOT NULL,
    "product_id" TEXT,
    "title" VARCHAR(100) NOT NULL,
    "rating" SMALLINT NOT NULL,
    "content" TEXT,
    "published_on" DATE NOT NULL,
    "deleted_at" DATE,

    CONSTRAINT "Product_Review_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "email" TEXT,
    "emailVerified" TIMESTAMP(3),
    "image" TEXT,
    "first_name" VARCHAR(50) NOT NULL,
    "last_name" VARCHAR(50) NOT NULL,
    "username" VARCHAR(50) NOT NULL,
    "password" TEXT NOT NULL,
    "telephone" VARCHAR(15) NOT NULL,
    "dob" DATE NOT NULL,
    "gender" "GenderType",
    "register_on" DATE NOT NULL,
    "last_login" DATE NOT NULL,
    "acc_status" "Acc_status" NOT NULL DEFAULT 'ACTIVE',
    "modified_at" DATE,
    "deleted_at" DATE,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "User_Payment" (
    "id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "card_type" VARCHAR(50) NOT NULL,
    "provider" VARCHAR(75) NOT NULL,
    "name_on_card" VARCHAR(100) NOT NULL,
    "card_number" VARCHAR(16) NOT NULL,
    "cvv" VARCHAR(4) NOT NULL,
    "card_expiry" DATE NOT NULL,
    "create_at" DATE NOT NULL,
    "modified_at" DATE,
    "deleted_at" DATE,

    CONSTRAINT "User_Payment_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Order_Transaction" (
    "id" TEXT NOT NULL,
    "order_id" TEXT NOT NULL,
    "payment_id" TEXT NOT NULL,
    "type" "CardType" NOT NULL,
    "amount" DOUBLE PRECISION NOT NULL,
    "status" "OrderTransactionStatus" NOT NULL,
    "create_at" DATE NOT NULL,
    "modified_at" DATE,

    CONSTRAINT "Order_Transaction_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Shipping" (
    "id" TEXT NOT NULL,
    "shipping_method" VARCHAR(50) NOT NULL,
    "courier_service_provider" VARCHAR(75) NOT NULL,
    "shipping_cost" DOUBLE PRECISION NOT NULL,
    "create_at" DATE NOT NULL,
    "modified_at" DATE,
    "deleted_at" DATE,

    CONSTRAINT "Shipping_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Address" (
    "id" TEXT NOT NULL,
    "user_id" TEXT,
    "address_line1" VARCHAR(100) NOT NULL,
    "address_line2" VARCHAR(100),
    "subDistrict" VARCHAR(50) NOT NULL,
    "district" VARCHAR(50) NOT NULL,
    "province" VARCHAR(50) NOT NULL,
    "zipcode" VARCHAR(5) NOT NULL,
    "create_at" DATE NOT NULL,
    "modified_at" DATE,
    "deleted_at" DATE,

    CONSTRAINT "Address_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Order_Status" (
    "id" TEXT NOT NULL,
    "status" "StatusType" NOT NULL DEFAULT 'PENDING',
    "description" TEXT,
    "create_at" DATE NOT NULL,
    "modified_at" DATE,

    CONSTRAINT "Order_Status_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Order_Item" (
    "id" TEXT NOT NULL,
    "order_id" TEXT NOT NULL,
    "product_id" TEXT,
    "price" DOUBLE PRECISION NOT NULL,
    "discount" DOUBLE PRECISION,
    "quantity" SMALLINT NOT NULL,
    "create_at" DATE NOT NULL,
    "modified_at" DATE,

    CONSTRAINT "Order_Item_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Order_details" (
    "id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "status_id" TEXT NOT NULL,
    "subtotal_amount" DOUBLE PRECISION NOT NULL,
    "product_discout" DOUBLE PRECISION NOT NULL,
    "tax_amount" INTEGER NOT NULL,
    "shipping_id" TEXT NOT NULL,
    "shipping_date" DATE NOT NULL,
    "address_id" TEXT NOT NULL,
    "total_amount" DOUBLE PRECISION NOT NULL,
    "create_at" DATE NOT NULL,
    "modified_at" DATE,
    "admin_UserId" TEXT NOT NULL,

    CONSTRAINT "Order_details_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Admin_Type" (
    "id" TEXT NOT NULL,
    "type" "AdminType" NOT NULL DEFAULT 'staff',
    "permission" VARCHAR(100) NOT NULL,
    "create_at" DATE NOT NULL,
    "modified_at" DATE,

    CONSTRAINT "Admin_Type_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Admin_User" (
    "id" TEXT NOT NULL,
    "usernames" VARCHAR(50) NOT NULL,
    "password" TEXT NOT NULL,
    "first_name" VARCHAR(50) NOT NULL,
    "last_name" VARCHAR(50) NOT NULL,
    "last_login" DATE NOT NULL,
    "create_at" DATE NOT NULL,
    "modified_at" DATE,
    "deleted_at" DATE,
    "admin_type_id" TEXT,

    CONSTRAINT "Admin_User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Account" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "provider" TEXT NOT NULL,
    "providerAccountId" TEXT NOT NULL,
    "refresh_token" TEXT,
    "access_token" TEXT,
    "expires_at" INTEGER,
    "token_type" TEXT,
    "scope" TEXT,
    "id_token" TEXT,
    "session_state" TEXT,

    CONSTRAINT "Account_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Session" (
    "id" TEXT NOT NULL,
    "sessionToken" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "expires" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Session_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "VerificationToken" (
    "identifier" TEXT NOT NULL,
    "token" TEXT NOT NULL,
    "expires" TIMESTAMP(3) NOT NULL
);

-- CreateTable
CREATE TABLE "_ProductToSeasonal_Information" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_CategoryToProduct" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "User_username_key" ON "User"("username");

-- CreateIndex
CREATE UNIQUE INDEX "Order_Status_status_key" ON "Order_Status"("status");

-- CreateIndex
CREATE UNIQUE INDEX "Order_details_status_id_key" ON "Order_details"("status_id");

-- CreateIndex
CREATE UNIQUE INDEX "Order_details_admin_UserId_key" ON "Order_details"("admin_UserId");

-- CreateIndex
CREATE UNIQUE INDEX "Admin_Type_type_key" ON "Admin_Type"("type");

-- CreateIndex
CREATE UNIQUE INDEX "Admin_User_usernames_key" ON "Admin_User"("usernames");

-- CreateIndex
CREATE UNIQUE INDEX "Account_provider_providerAccountId_key" ON "Account"("provider", "providerAccountId");

-- CreateIndex
CREATE UNIQUE INDEX "Session_sessionToken_key" ON "Session"("sessionToken");

-- CreateIndex
CREATE UNIQUE INDEX "VerificationToken_token_key" ON "VerificationToken"("token");

-- CreateIndex
CREATE UNIQUE INDEX "VerificationToken_identifier_token_key" ON "VerificationToken"("identifier", "token");

-- CreateIndex
CREATE UNIQUE INDEX "_ProductToSeasonal_Information_AB_unique" ON "_ProductToSeasonal_Information"("A", "B");

-- CreateIndex
CREATE INDEX "_ProductToSeasonal_Information_B_index" ON "_ProductToSeasonal_Information"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_CategoryToProduct_AB_unique" ON "_CategoryToProduct"("A", "B");

-- CreateIndex
CREATE INDEX "_CategoryToProduct_B_index" ON "_CategoryToProduct"("B");

-- AddForeignKey
ALTER TABLE "Product" ADD CONSTRAINT "Product_family_id_fkey" FOREIGN KEY ("family_id") REFERENCES "Flower_Family"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Product" ADD CONSTRAINT "Product_color_id_fkey" FOREIGN KEY ("color_id") REFERENCES "Flower_Color"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Product" ADD CONSTRAINT "Product_type_id_fkey" FOREIGN KEY ("type_id") REFERENCES "Flower_Type"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Product" ADD CONSTRAINT "Product_discount_id_fkey" FOREIGN KEY ("discount_id") REFERENCES "Discount"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Product" ADD CONSTRAINT "Product_admin_id_fkey" FOREIGN KEY ("admin_id") REFERENCES "Admin_User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Product_Review" ADD CONSTRAINT "Product_Review_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "Product"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "User_Payment" ADD CONSTRAINT "User_Payment_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Order_Transaction" ADD CONSTRAINT "Order_Transaction_order_id_fkey" FOREIGN KEY ("order_id") REFERENCES "Order_details"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Order_Transaction" ADD CONSTRAINT "Order_Transaction_payment_id_fkey" FOREIGN KEY ("payment_id") REFERENCES "User_Payment"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Address" ADD CONSTRAINT "Address_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Order_Item" ADD CONSTRAINT "Order_Item_order_id_fkey" FOREIGN KEY ("order_id") REFERENCES "Order_details"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Order_Item" ADD CONSTRAINT "Order_Item_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "Product"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Order_details" ADD CONSTRAINT "Order_details_status_id_fkey" FOREIGN KEY ("status_id") REFERENCES "Order_Status"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Order_details" ADD CONSTRAINT "Order_details_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Order_details" ADD CONSTRAINT "Order_details_shipping_id_fkey" FOREIGN KEY ("shipping_id") REFERENCES "Shipping"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Order_details" ADD CONSTRAINT "Order_details_address_id_fkey" FOREIGN KEY ("address_id") REFERENCES "Address"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Admin_User" ADD CONSTRAINT "Admin_User_admin_type_id_fkey" FOREIGN KEY ("admin_type_id") REFERENCES "Admin_Type"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Account" ADD CONSTRAINT "Account_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Session" ADD CONSTRAINT "Session_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ProductToSeasonal_Information" ADD CONSTRAINT "_ProductToSeasonal_Information_A_fkey" FOREIGN KEY ("A") REFERENCES "Product"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ProductToSeasonal_Information" ADD CONSTRAINT "_ProductToSeasonal_Information_B_fkey" FOREIGN KEY ("B") REFERENCES "Seasonal_Information"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CategoryToProduct" ADD CONSTRAINT "_CategoryToProduct_A_fkey" FOREIGN KEY ("A") REFERENCES "Category"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CategoryToProduct" ADD CONSTRAINT "_CategoryToProduct_B_fkey" FOREIGN KEY ("B") REFERENCES "Product"("id") ON DELETE CASCADE ON UPDATE CASCADE;
