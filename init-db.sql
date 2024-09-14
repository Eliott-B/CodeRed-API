-- SCRIPT FOR INITIALIZING THE DATABASE
-- MariaDB 11.4

-- Create tables
CREATE TABLE `groups` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `username` VARCHAR(45),
  `password` VARCHAR(45) NOT NULL,
  `admin` BOOLEAN DEFAULT FALSE,
  PRIMARY KEY (`id`)
);

CREATE TABLE `enigmas` (
    `id` INT NOT NULL AUTO_INCREMENT,
    `title` VARCHAR(45) NOT NULL,
    `description` TEXT NOT NULL,
    `points` INT DEFAULT 10,
    PRIMARY KEY (`id`)
);

CREATE TABLE `solutions` (
    `enigma_id` INT NOT NULL,
    `groups_id` INT NOT NULL,
    `solution` TEXT NOT NULL,
    `input_path` LONGTEXT,
    `success` BOOLEAN DEFAULT FALSE,
    PRIMARY KEY (`enigma_id`, `groups_id`),
    FOREIGN KEY (`enigma_id`) REFERENCES `enigmas`(`id`),
    FOREIGN KEY (`groups_id`) REFERENCES `groups`(`id`)
);
