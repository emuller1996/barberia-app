-- DropIndex
DROP INDEX `Barber_email_key` ON `barber`;

-- AlterTable
ALTER TABLE `barber` ADD COLUMN `title` VARCHAR(191) NULL;
