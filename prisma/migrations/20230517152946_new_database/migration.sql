-- AlterTable
ALTER TABLE "Address" ALTER COLUMN "address_line1" SET DATA TYPE TEXT,
ALTER COLUMN "address_line2" SET DATA TYPE TEXT,
ALTER COLUMN "subDistrict" SET DATA TYPE TEXT,
ALTER COLUMN "district" SET DATA TYPE TEXT,
ALTER COLUMN "province" SET DATA TYPE TEXT,
ALTER COLUMN "zipcode" SET DATA TYPE TEXT,
ALTER COLUMN "create_at" SET DATA TYPE TIMESTAMP(3),
ALTER COLUMN "modified_at" SET DATA TYPE TIMESTAMP(3),
ALTER COLUMN "deleted_at" SET DATA TYPE TIMESTAMP(3);

-- AlterTable
ALTER TABLE "Admin_Type" ALTER COLUMN "permission" SET DATA TYPE TEXT,
ALTER COLUMN "create_at" SET DATA TYPE TIMESTAMP(3),
ALTER COLUMN "modified_at" SET DATA TYPE TIMESTAMP(3);

-- AlterTable
ALTER TABLE "Admin_User" ALTER COLUMN "usernames" SET DATA TYPE TEXT,
ALTER COLUMN "first_name" SET DATA TYPE TEXT,
ALTER COLUMN "last_name" SET DATA TYPE TEXT,
ALTER COLUMN "last_login" SET DATA TYPE TIMESTAMP(3),
ALTER COLUMN "create_at" SET DATA TYPE TIMESTAMP(3),
ALTER COLUMN "modified_at" SET DATA TYPE TIMESTAMP(3),
ALTER COLUMN "deleted_at" SET DATA TYPE TIMESTAMP(3);

-- AlterTable
ALTER TABLE "Category" ALTER COLUMN "name" SET DATA TYPE TEXT,
ALTER COLUMN "create_at" SET DATA TYPE TIMESTAMP(3),
ALTER COLUMN "modified_at" SET DATA TYPE TIMESTAMP(3),
ALTER COLUMN "deleted_at" SET DATA TYPE TIMESTAMP(3);

-- AlterTable
ALTER TABLE "Discount" ALTER COLUMN "name" SET DATA TYPE TEXT,
ALTER COLUMN "create_at" SET DATA TYPE TIMESTAMP(3),
ALTER COLUMN "modified_at" SET DATA TYPE TIMESTAMP(3),
ALTER COLUMN "deleted_at" SET DATA TYPE TIMESTAMP(3);

-- AlterTable
ALTER TABLE "Flower_Color" ALTER COLUMN "name" SET DATA TYPE TEXT,
ALTER COLUMN "create_at" SET DATA TYPE TIMESTAMP(3),
ALTER COLUMN "modified_at" SET DATA TYPE TIMESTAMP(3),
ALTER COLUMN "deleted_at" SET DATA TYPE TIMESTAMP(3);

-- AlterTable
ALTER TABLE "Flower_Family" ALTER COLUMN "name" SET DATA TYPE TEXT,
ALTER COLUMN "create_at" SET DATA TYPE TIMESTAMP(3),
ALTER COLUMN "modified_at" SET DATA TYPE TIMESTAMP(3),
ALTER COLUMN "deleted_at" SET DATA TYPE TIMESTAMP(3);

-- AlterTable
ALTER TABLE "Flower_Type" ALTER COLUMN "name" SET DATA TYPE TEXT,
ALTER COLUMN "create_at" SET DATA TYPE TIMESTAMP(3),
ALTER COLUMN "modified_at" SET DATA TYPE TIMESTAMP(3),
ALTER COLUMN "deleted_at" SET DATA TYPE TIMESTAMP(3);

-- AlterTable
ALTER TABLE "Order_Item" ALTER COLUMN "quantity" SET DATA TYPE INTEGER,
ALTER COLUMN "create_at" SET DATA TYPE TIMESTAMP(3),
ALTER COLUMN "modified_at" SET DATA TYPE TIMESTAMP(3);

-- AlterTable
ALTER TABLE "Order_Status" ALTER COLUMN "create_at" SET DATA TYPE TIMESTAMP(3),
ALTER COLUMN "modified_at" SET DATA TYPE TIMESTAMP(3);

-- AlterTable
ALTER TABLE "Order_Transaction" ALTER COLUMN "create_at" SET DATA TYPE TIMESTAMP(3),
ALTER COLUMN "modified_at" SET DATA TYPE TIMESTAMP(3);

-- AlterTable
ALTER TABLE "Order_details" ALTER COLUMN "shipping_date" SET DATA TYPE TIMESTAMP(3),
ALTER COLUMN "create_at" SET DATA TYPE TIMESTAMP(3),
ALTER COLUMN "modified_at" SET DATA TYPE TIMESTAMP(3);

-- AlterTable
ALTER TABLE "Product" ALTER COLUMN "title" SET DATA TYPE TEXT,
ALTER COLUMN "image" SET DATA TYPE TEXT,
ALTER COLUMN "bloom_size" SET DATA TYPE TEXT,
ALTER COLUMN "create_at" SET DATA TYPE TIMESTAMP(3),
ALTER COLUMN "modified_at" SET DATA TYPE TIMESTAMP(3),
ALTER COLUMN "deleted_at" SET DATA TYPE TIMESTAMP(3);

-- AlterTable
ALTER TABLE "Product_Review" ALTER COLUMN "title" SET DATA TYPE TEXT,
ALTER COLUMN "rating" SET DATA TYPE INTEGER,
ALTER COLUMN "published_on" SET DATA TYPE TIMESTAMP(3),
ALTER COLUMN "deleted_at" SET DATA TYPE TIMESTAMP(3);

-- AlterTable
ALTER TABLE "Seasonal_Information" ALTER COLUMN "name" SET DATA TYPE TEXT,
ALTER COLUMN "create_at" SET DATA TYPE TIMESTAMP(3),
ALTER COLUMN "modified_at" SET DATA TYPE TIMESTAMP(3),
ALTER COLUMN "deleted_at" SET DATA TYPE TIMESTAMP(3);

-- AlterTable
ALTER TABLE "Shipping" ALTER COLUMN "shipping_method" SET DATA TYPE TEXT,
ALTER COLUMN "courier_service_provider" SET DATA TYPE TEXT,
ALTER COLUMN "create_at" SET DATA TYPE TIMESTAMP(3),
ALTER COLUMN "modified_at" SET DATA TYPE TIMESTAMP(3),
ALTER COLUMN "deleted_at" SET DATA TYPE TIMESTAMP(3);

-- AlterTable
ALTER TABLE "User" ALTER COLUMN "first_name" SET DATA TYPE TEXT,
ALTER COLUMN "last_name" SET DATA TYPE TEXT,
ALTER COLUMN "telephone" SET DATA TYPE TEXT,
ALTER COLUMN "dob" SET DATA TYPE TIMESTAMP(3),
ALTER COLUMN "register_on" SET DATA TYPE TIMESTAMP(3),
ALTER COLUMN "last_login" SET DATA TYPE TIMESTAMP(3),
ALTER COLUMN "modified_at" SET DATA TYPE TIMESTAMP(3),
ALTER COLUMN "deleted_at" SET DATA TYPE TIMESTAMP(3);

-- AlterTable
ALTER TABLE "User_Payment" ALTER COLUMN "card_type" SET DATA TYPE TEXT,
ALTER COLUMN "provider" SET DATA TYPE TEXT,
ALTER COLUMN "name_on_card" SET DATA TYPE TEXT,
ALTER COLUMN "card_number" SET DATA TYPE TEXT,
ALTER COLUMN "cvv" SET DATA TYPE TEXT,
ALTER COLUMN "card_expiry" SET DATA TYPE TIMESTAMP(3),
ALTER COLUMN "create_at" SET DATA TYPE TIMESTAMP(3),
ALTER COLUMN "modified_at" SET DATA TYPE TIMESTAMP(3),
ALTER COLUMN "deleted_at" SET DATA TYPE TIMESTAMP(3);
