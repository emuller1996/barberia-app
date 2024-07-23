-- AlterTable
ALTER TABLE `invoice` ADD COLUMN `payment_method` VARCHAR(191) NULL;

-- CreateTable
CREATE TABLE `CashMovement` (
    `id` VARCHAR(191) NOT NULL,
    `date` DATETIME(3) NULL,
    `entry` DOUBLE NULL,
    `exit` DOUBLE NULL,
    `concept` VARCHAR(191) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
