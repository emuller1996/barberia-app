/*
  Warnings:

  - You are about to drop the column `appointmentId` on the `service` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE `service` DROP FOREIGN KEY `Service_appointmentId_fkey`;

-- AlterTable
ALTER TABLE `service` DROP COLUMN `appointmentId`;

-- CreateTable
CREATE TABLE `_AppointmentToService` (
    `A` VARCHAR(191) NOT NULL,
    `B` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `_AppointmentToService_AB_unique`(`A`, `B`),
    INDEX `_AppointmentToService_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `_AppointmentToService` ADD CONSTRAINT `_AppointmentToService_A_fkey` FOREIGN KEY (`A`) REFERENCES `Appointment`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_AppointmentToService` ADD CONSTRAINT `_AppointmentToService_B_fkey` FOREIGN KEY (`B`) REFERENCES `Service`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
