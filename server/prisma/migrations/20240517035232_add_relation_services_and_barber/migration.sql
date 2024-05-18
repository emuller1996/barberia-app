-- CreateTable
CREATE TABLE `_BarberToService` (
    `A` VARCHAR(191) NOT NULL,
    `B` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `_BarberToService_AB_unique`(`A`, `B`),
    INDEX `_BarberToService_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `_BarberToService` ADD CONSTRAINT `_BarberToService_A_fkey` FOREIGN KEY (`A`) REFERENCES `Barber`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_BarberToService` ADD CONSTRAINT `_BarberToService_B_fkey` FOREIGN KEY (`B`) REFERENCES `Service`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
