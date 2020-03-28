-- ---
-- Globals
-- ---

-- SET SQL_MODE="NO_AUTO_VALUE_ON_ZERO";
-- SET FOREIGN_KEY_CHECKS=0;

DROP DATABASE IF EXISTS zips;
CREATE DATABASE zips;
USE zips;

-- ---
-- Table 'members'
--
-- ---

DROP TABLE IF EXISTS `codes`;

CREATE TABLE `codes` (
  `zip` VARCHAR(5) NOT NULL,
  `lat` VARCHAR(20) DEFAULT NULL,
  `lng` VARCHAR(20) DEFAULT NULL,
  PRIMARY KEY (`zip`)
);