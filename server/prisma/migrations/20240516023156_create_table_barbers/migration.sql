-- CreateTable
CREATE TABLE `Barber` (
    `id` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NULL,
    `number_phone` VARCHAR(191) NULL,
    `img_url` VARCHAR(191) NULL,

    UNIQUE INDEX `Barber_email_key`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
