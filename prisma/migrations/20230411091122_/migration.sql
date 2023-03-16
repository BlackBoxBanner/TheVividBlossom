/*
  Warnings:

  - You are about to alter the column `create_at` on the `Address` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to alter the column `modified_at` on the `Address` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to alter the column `deleted_at` on the `Address` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to alter the column `create_at` on the `Admin_Type` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to alter the column `modified_at` on the `Admin_Type` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to alter the column `last_login` on the `Admin_User` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to alter the column `create_at` on the `Admin_User` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to alter the column `modified_at` on the `Admin_User` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to alter the column `deleted_at` on the `Admin_User` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to alter the column `create_at` on the `Category` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to alter the column `modified_at` on the `Category` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to alter the column `deleted_at` on the `Category` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to alter the column `create_at` on the `Discount` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to alter the column `modified_at` on the `Discount` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to alter the column `deleted_at` on the `Discount` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to alter the column `create_at` on the `Flower_Color` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to alter the column `modified_at` on the `Flower_Color` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to alter the column `deleted_at` on the `Flower_Color` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to alter the column `create_at` on the `Flower_Family` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to alter the column `modified_at` on the `Flower_Family` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to alter the column `deleted_at` on the `Flower_Family` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to alter the column `create_at` on the `Flower_Type` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to alter the column `modified_at` on the `Flower_Type` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to alter the column `deleted_at` on the `Flower_Type` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to alter the column `create_at` on the `Order_Item` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to alter the column `modified_at` on the `Order_Item` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to alter the column `create_at` on the `Order_Status` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to alter the column `modified_at` on the `Order_Status` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to alter the column `create_at` on the `Order_Transaction` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to alter the column `modified_at` on the `Order_Transaction` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to alter the column `create_at` on the `Order_details` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to alter the column `modified_at` on the `Order_details` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to alter the column `create_at` on the `Product` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to alter the column `modified_at` on the `Product` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to alter the column `deleted_at` on the `Product` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to alter the column `published_on` on the `Product_Review` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to alter the column `deleted_at` on the `Product_Review` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to alter the column `create_at` on the `Seasonal_Information` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to alter the column `modified_at` on the `Seasonal_Information` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to alter the column `deleted_at` on the `Seasonal_Information` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to alter the column `create_at` on the `Shipping` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to alter the column `modified_at` on the `Shipping` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to alter the column `deleted_at` on the `Shipping` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to drop the column `name` on the `User` table. All the data in the column will be lost.
  - You are about to alter the column `dob` on the `User` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to alter the column `register_on` on the `User` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to alter the column `last_login` on the `User` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to alter the column `modified_at` on the `User` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to alter the column `deleted_at` on the `User` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to alter the column `card_expiry` on the `User_Payment` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to alter the column `create_at` on the `User_Payment` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to alter the column `modified_at` on the `User_Payment` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to alter the column `deleted_at` on the `User_Payment` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.

*/
-- AlterTable
ALTER TABLE `Address` MODIFY `create_at` DATETIME NOT NULL,
    MODIFY `modified_at` DATETIME NULL,
    MODIFY `deleted_at` DATETIME NULL;

-- AlterTable
ALTER TABLE `Admin_Type` MODIFY `create_at` DATETIME NOT NULL,
    MODIFY `modified_at` DATETIME NULL;

-- AlterTable
ALTER TABLE `Admin_User` MODIFY `last_login` DATETIME NOT NULL,
    MODIFY `create_at` DATETIME NOT NULL,
    MODIFY `modified_at` DATETIME NULL,
    MODIFY `deleted_at` DATETIME NULL;

-- AlterTable
ALTER TABLE `Category` MODIFY `create_at` DATETIME NOT NULL,
    MODIFY `modified_at` DATETIME NULL,
    MODIFY `deleted_at` DATETIME NULL;

-- AlterTable
ALTER TABLE `Discount` MODIFY `create_at` DATETIME NOT NULL,
    MODIFY `modified_at` DATETIME NULL,
    MODIFY `deleted_at` DATETIME NULL;

-- AlterTable
ALTER TABLE `Flower_Color` MODIFY `create_at` DATETIME NOT NULL,
    MODIFY `modified_at` DATETIME NULL,
    MODIFY `deleted_at` DATETIME NULL;

-- AlterTable
ALTER TABLE `Flower_Family` MODIFY `create_at` DATETIME NOT NULL,
    MODIFY `modified_at` DATETIME NULL,
    MODIFY `deleted_at` DATETIME NULL;

-- AlterTable
ALTER TABLE `Flower_Type` MODIFY `create_at` DATETIME NOT NULL,
    MODIFY `modified_at` DATETIME NULL,
    MODIFY `deleted_at` DATETIME NULL;

-- AlterTable
ALTER TABLE `Order_Item` MODIFY `create_at` DATETIME NOT NULL,
    MODIFY `modified_at` DATETIME NULL;

-- AlterTable
ALTER TABLE `Order_Status` MODIFY `status` ENUM('CANCELED', 'PENDING', 'REJECTED', 'DELIVERED') NOT NULL DEFAULT 'PENDING',
    MODIFY `create_at` DATETIME NOT NULL,
    MODIFY `modified_at` DATETIME NULL;

-- AlterTable
ALTER TABLE `Order_Transaction` MODIFY `create_at` DATETIME NOT NULL,
    MODIFY `modified_at` DATETIME NULL;

-- AlterTable
ALTER TABLE `Order_details` MODIFY `create_at` DATETIME NOT NULL,
    MODIFY `modified_at` DATETIME NULL;

-- AlterTable
ALTER TABLE `Product` ADD COLUMN `status` ENUM('AVAILABLE', 'LOW_STOCK', 'OUT_OF_STOCK', 'ARCHIVED') NOT NULL DEFAULT 'OUT_OF_STOCK',
    MODIFY `create_at` DATETIME NOT NULL,
    MODIFY `modified_at` DATETIME NULL,
    MODIFY `deleted_at` DATETIME NULL;

-- AlterTable
ALTER TABLE `Product_Review` MODIFY `published_on` DATETIME NOT NULL,
    MODIFY `deleted_at` DATETIME NULL;

-- AlterTable
ALTER TABLE `Seasonal_Information` MODIFY `create_at` DATETIME NOT NULL,
    MODIFY `modified_at` DATETIME NULL,
    MODIFY `deleted_at` DATETIME NULL;

-- AlterTable
ALTER TABLE `Shipping` MODIFY `create_at` DATETIME NOT NULL,
    MODIFY `modified_at` DATETIME NULL,
    MODIFY `deleted_at` DATETIME NULL;

-- AlterTable
ALTER TABLE `User` DROP COLUMN `name`,
    ADD COLUMN `acc_status` ENUM('ACTIVE', 'SUSPENDED', 'DELETED') NOT NULL DEFAULT 'ACTIVE',
    MODIFY `dob` DATETIME NOT NULL,
    MODIFY `register_on` DATETIME NOT NULL,
    MODIFY `last_login` DATETIME NOT NULL,
    MODIFY `modified_at` DATETIME NULL,
    MODIFY `deleted_at` DATETIME NULL;

-- AlterTable
ALTER TABLE `User_Payment` MODIFY `card_expiry` DATETIME NOT NULL,
    MODIFY `create_at` DATETIME NOT NULL,
    MODIFY `modified_at` DATETIME NULL,
    MODIFY `deleted_at` DATETIME NULL;
