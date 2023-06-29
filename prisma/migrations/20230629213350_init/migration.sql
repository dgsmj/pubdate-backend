-- CreateTable
CREATE TABLE `product` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `description` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `impact_platform` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `description` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `publish_classification` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `description` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `publish` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `published_date` DATETIME(3) NOT NULL,
    `publish_classification_id` INTEGER NOT NULL,
    `title` VARCHAR(191) NOT NULL,
    `description` TEXT NOT NULL,
    `product_owner` VARCHAR(191) NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `publish_has_product` (
    `publush_id` INTEGER NOT NULL,
    `product_id` INTEGER NOT NULL,

    UNIQUE INDEX `publish_has_product_publush_id_product_id_key`(`publush_id`, `product_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `publish_has_impacted_platforms` (
    `publish_id` INTEGER NOT NULL,
    `impact_platform_id` INTEGER NOT NULL,

    UNIQUE INDEX `publish_has_impacted_platforms_publish_id_impact_platform_id_key`(`publish_id`, `impact_platform_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `publish` ADD CONSTRAINT `publish_publish_classification_id_fkey` FOREIGN KEY (`publish_classification_id`) REFERENCES `publish_classification`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `publish_has_product` ADD CONSTRAINT `publish_has_product_product_id_fkey` FOREIGN KEY (`product_id`) REFERENCES `product`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `publish_has_product` ADD CONSTRAINT `publish_has_product_publush_id_fkey` FOREIGN KEY (`publush_id`) REFERENCES `publish`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `publish_has_impacted_platforms` ADD CONSTRAINT `publish_has_impacted_platforms_publish_id_fkey` FOREIGN KEY (`publish_id`) REFERENCES `publish`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `publish_has_impacted_platforms` ADD CONSTRAINT `publish_has_impacted_platforms_impact_platform_id_fkey` FOREIGN KEY (`impact_platform_id`) REFERENCES `impact_platform`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
