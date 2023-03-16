-- CreateTable
CREATE TABLE `Product` (
    `id` VARCHAR(191) NOT NULL,
    `title` VARCHAR(75) NOT NULL,
    `image` VARCHAR(100) NOT NULL,
    `description` TEXT NOT NULL,
    `showing_instruction` TEXT NOT NULL,
    `bloom_size` VARCHAR(75) NOT NULL,
    `type_id` VARCHAR(191) NOT NULL,
    `color_id` VARCHAR(191) NOT NULL,
    `season_id` VARCHAR(191) NOT NULL,
    `family_id` VARCHAR(191) NOT NULL,
    `cost_price` FLOAT NOT NULL,
    `selling_price` FLOAT NOT NULL,
    `inventory` INTEGER NOT NULL,
    `sku` INTEGER NOT NULL,
    `discount_id` VARCHAR(191) NULL,
    `create_at` DATETIME NOT NULL,
    `modified_at` DATETIME NULL,
    `deleted_at` DATETIME NULL,
    `category_id` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Category` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(100) NOT NULL,
    `description` TEXT NOT NULL,
    `create_at` DATETIME NOT NULL,
    `modified_at` DATETIME NULL,
    `deleted_at` DATETIME NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Flower_Family` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(75) NOT NULL,
    `description` TEXT NULL,
    `create_at` DATETIME NOT NULL,
    `modified_at` DATETIME NULL,
    `deleted_at` DATETIME NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Seasonal_Information` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(75) NOT NULL,
    `description` TEXT NULL,
    `create_at` DATETIME NOT NULL,
    `modified_at` DATETIME NULL,
    `deleted_at` DATETIME NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Flower_Type` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(75) NOT NULL,
    `description` TEXT NULL,
    `create_at` DATETIME NOT NULL,
    `modified_at` DATETIME NULL,
    `deleted_at` DATETIME NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Flower_Color` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(75) NOT NULL,
    `description` TEXT NULL,
    `create_at` DATETIME NOT NULL,
    `modified_at` DATETIME NULL,
    `deleted_at` DATETIME NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Discount` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(75) NOT NULL,
    `description` TEXT NULL,
    `discount_precent` FLOAT NOT NULL,
    `status` ENUM('ACTIVE', 'INACTIVE') NOT NULL DEFAULT 'INACTIVE',
    `create_at` DATETIME NOT NULL,
    `modified_at` DATETIME NULL,
    `deleted_at` DATETIME NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Product_Review` (
    `id` VARCHAR(191) NOT NULL,
    `product_id` VARCHAR(191) NULL,
    `title` VARCHAR(100) NOT NULL,
    `rating` SMALLINT NOT NULL,
    `content` TEXT NULL,
    `published_on` DATETIME NOT NULL,
    `deleted_at` DATETIME NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `User` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NULL,
    `email` VARCHAR(191) NULL,
    `emailVerified` DATETIME(3) NULL,
    `image` VARCHAR(191) NULL,
    `first_name` VARCHAR(50) NOT NULL,
    `last_name` VARCHAR(50) NOT NULL,
    `username` VARCHAR(50) NOT NULL,
    `password` VARCHAR(191) NOT NULL,
    `telephone` VARCHAR(15) NOT NULL,
    `dob` DATETIME NOT NULL,
    `gender` ENUM('male', 'female') NULL,
    `register_on` DATETIME NOT NULL,
    `last_login` DATETIME NOT NULL,
    `modified_at` DATETIME NULL,
    `deleted_at` DATETIME NULL,

    UNIQUE INDEX `User_email_key`(`email`),
    UNIQUE INDEX `User_username_key`(`username`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `User_Payment` (
    `id` VARCHAR(191) NOT NULL,
    `user_id` VARCHAR(191) NOT NULL,
    `card_type` VARCHAR(50) NOT NULL,
    `provider` VARCHAR(75) NOT NULL,
    `name_on_card` VARCHAR(100) NOT NULL,
    `card_number` VARCHAR(16) NOT NULL,
    `cvv` VARCHAR(4) NOT NULL,
    `card_expiry` DATETIME NOT NULL,
    `create_at` DATETIME NOT NULL,
    `modified_at` DATETIME NULL,
    `deleted_at` DATETIME NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Order_Transaction` (
    `id` VARCHAR(191) NOT NULL,
    `order_id` VARCHAR(191) NOT NULL,
    `payment_id` VARCHAR(191) NOT NULL,
    `type` ENUM('CREDIT', 'DEBIT') NOT NULL,
    `amount` FLOAT NOT NULL,
    `status` ENUM('CANCELED', 'FAILED', 'PENDING', 'REJECTED', 'DECLINED', 'SUCCESSFUL') NOT NULL,
    `create_at` DATETIME NOT NULL,
    `modified_at` DATETIME NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Shipping` (
    `id` VARCHAR(191) NOT NULL,
    `shipping_method` VARCHAR(50) NOT NULL,
    `courier_service_provider` VARCHAR(75) NOT NULL,
    `shipping_cost` FLOAT NOT NULL,
    `create_at` DATETIME NOT NULL,
    `modified_at` DATETIME NULL,
    `deleted_at` DATETIME NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Address` (
    `id` VARCHAR(191) NOT NULL,
    `user_id` VARCHAR(191) NULL,
    `address_line1` VARCHAR(100) NOT NULL,
    `address_line2` VARCHAR(100) NULL,
    `subDistrict` VARCHAR(50) NOT NULL,
    `district` VARCHAR(50) NOT NULL,
    `province` VARCHAR(50) NOT NULL,
    `zipcode` VARCHAR(5) NOT NULL,
    `create_at` DATETIME NOT NULL,
    `modified_at` DATETIME NULL,
    `deleted_at` DATETIME NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Order_Status` (
    `id` VARCHAR(191) NOT NULL,
    `status` ENUM('CANCELED', 'PENDING', 'REJECTED', 'DELIVERED') NOT NULL,
    `description` TEXT NULL,
    `create_at` DATETIME NOT NULL,
    `modified_at` DATETIME NULL,

    UNIQUE INDEX `Order_Status_status_key`(`status`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Order_Item` (
    `id` VARCHAR(191) NOT NULL,
    `order_id` VARCHAR(191) NOT NULL,
    `product_id` VARCHAR(191) NULL,
    `price` FLOAT NOT NULL,
    `discount` FLOAT NULL,
    `quantity` SMALLINT NOT NULL,
    `create_at` DATETIME NOT NULL,
    `modified_at` DATETIME NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Order_details` (
    `id` VARCHAR(191) NOT NULL,
    `user_id` VARCHAR(191) NOT NULL,
    `status_id` VARCHAR(191) NOT NULL,
    `subtotal_amount` FLOAT NOT NULL,
    `product_discout` FLOAT NOT NULL,
    `tax_amount` INTEGER NOT NULL,
    `shipping_id` VARCHAR(191) NOT NULL,
    `shipping_date` DATE NOT NULL,
    `address_id` VARCHAR(191) NOT NULL,
    `total_amount` FLOAT NOT NULL,
    `create_at` DATETIME NOT NULL,
    `modified_at` DATETIME NULL,
    `admin_UserId` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `Order_details_status_id_key`(`status_id`),
    UNIQUE INDEX `Order_details_admin_UserId_key`(`admin_UserId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Admin_Type` (
    `id` VARCHAR(191) NOT NULL,
    `type` VARCHAR(50) NOT NULL,
    `permission` VARCHAR(100) NOT NULL,
    `create_at` DATETIME NOT NULL,
    `modified_at` DATETIME NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Admin_User` (
    `id` VARCHAR(191) NOT NULL,
    `usernames` VARCHAR(50) NOT NULL,
    `password` VARCHAR(50) NOT NULL,
    `first_name` VARCHAR(50) NOT NULL,
    `last_name` VARCHAR(50) NOT NULL,
    `last_login` DATETIME NOT NULL,
    `create_at` DATETIME NOT NULL,
    `modified_at` DATETIME NULL,
    `deleted_at` DATETIME NULL,
    `admin_type_id` VARCHAR(191) NOT NULL,
    `product_id` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Account` (
    `id` VARCHAR(191) NOT NULL,
    `userId` VARCHAR(191) NOT NULL,
    `type` VARCHAR(191) NOT NULL,
    `provider` VARCHAR(191) NOT NULL,
    `providerAccountId` VARCHAR(191) NOT NULL,
    `refresh_token` TEXT NULL,
    `access_token` TEXT NULL,
    `expires_at` INTEGER NULL,
    `token_type` VARCHAR(191) NULL,
    `scope` VARCHAR(191) NULL,
    `id_token` TEXT NULL,
    `session_state` VARCHAR(191) NULL,

    UNIQUE INDEX `Account_provider_providerAccountId_key`(`provider`, `providerAccountId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Session` (
    `id` VARCHAR(191) NOT NULL,
    `sessionToken` VARCHAR(191) NOT NULL,
    `userId` VARCHAR(191) NOT NULL,
    `expires` DATETIME(3) NOT NULL,

    UNIQUE INDEX `Session_sessionToken_key`(`sessionToken`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `VerificationToken` (
    `identifier` VARCHAR(191) NOT NULL,
    `token` VARCHAR(191) NOT NULL,
    `expires` DATETIME(3) NOT NULL,

    UNIQUE INDEX `VerificationToken_token_key`(`token`),
    UNIQUE INDEX `VerificationToken_identifier_token_key`(`identifier`, `token`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `_ProductToSeasonal_Information` (
    `A` VARCHAR(191) NOT NULL,
    `B` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `_ProductToSeasonal_Information_AB_unique`(`A`, `B`),
    INDEX `_ProductToSeasonal_Information_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Product` ADD CONSTRAINT `Product_category_id_fkey` FOREIGN KEY (`category_id`) REFERENCES `Category`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Product` ADD CONSTRAINT `Product_family_id_fkey` FOREIGN KEY (`family_id`) REFERENCES `Flower_Family`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Product` ADD CONSTRAINT `Product_color_id_fkey` FOREIGN KEY (`color_id`) REFERENCES `Flower_Color`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Product` ADD CONSTRAINT `Product_type_id_fkey` FOREIGN KEY (`type_id`) REFERENCES `Flower_Type`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Product` ADD CONSTRAINT `Product_discount_id_fkey` FOREIGN KEY (`discount_id`) REFERENCES `Discount`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Product_Review` ADD CONSTRAINT `Product_Review_product_id_fkey` FOREIGN KEY (`product_id`) REFERENCES `Product`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `User_Payment` ADD CONSTRAINT `User_Payment_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Order_Transaction` ADD CONSTRAINT `Order_Transaction_order_id_fkey` FOREIGN KEY (`order_id`) REFERENCES `Order_details`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Order_Transaction` ADD CONSTRAINT `Order_Transaction_payment_id_fkey` FOREIGN KEY (`payment_id`) REFERENCES `User_Payment`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Address` ADD CONSTRAINT `Address_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Order_Item` ADD CONSTRAINT `Order_Item_order_id_fkey` FOREIGN KEY (`order_id`) REFERENCES `Order_details`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Order_Item` ADD CONSTRAINT `Order_Item_product_id_fkey` FOREIGN KEY (`product_id`) REFERENCES `Product`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Order_details` ADD CONSTRAINT `Order_details_status_id_fkey` FOREIGN KEY (`status_id`) REFERENCES `Order_Status`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Order_details` ADD CONSTRAINT `Order_details_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Order_details` ADD CONSTRAINT `Order_details_shipping_id_fkey` FOREIGN KEY (`shipping_id`) REFERENCES `Shipping`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Order_details` ADD CONSTRAINT `Order_details_address_id_fkey` FOREIGN KEY (`address_id`) REFERENCES `Address`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Admin_User` ADD CONSTRAINT `Admin_User_product_id_fkey` FOREIGN KEY (`product_id`) REFERENCES `Product`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Admin_User` ADD CONSTRAINT `Admin_User_admin_type_id_fkey` FOREIGN KEY (`admin_type_id`) REFERENCES `Admin_Type`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Account` ADD CONSTRAINT `Account_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Session` ADD CONSTRAINT `Session_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_ProductToSeasonal_Information` ADD CONSTRAINT `_ProductToSeasonal_Information_A_fkey` FOREIGN KEY (`A`) REFERENCES `Product`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_ProductToSeasonal_Information` ADD CONSTRAINT `_ProductToSeasonal_Information_B_fkey` FOREIGN KEY (`B`) REFERENCES `Seasonal_Information`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
