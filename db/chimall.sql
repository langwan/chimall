/*
 Navicat Premium Data Transfer

 Source Server         : chimall
 Source Server Type    : MySQL
 Source Server Version : 80030
 Source Host           : localhost:3306
 Source Schema         : chimall

 Target Server Type    : MySQL
 Target Server Version : 80030
 File Encoding         : 65001

 Date: 09/03/2023 21:50:12
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for accounts
-- ----------------------------
DROP TABLE IF EXISTS `accounts`;
CREATE TABLE `accounts` (
  `id` varchar(255) NOT NULL COMMENT 'ID',
  `phone` varchar(255) NOT NULL COMMENT '电话',
  `nickname` varchar(255) NOT NULL COMMENT '昵称',
  `password` varchar(255) NOT NULL COMMENT '密码',
  `salt` varchar(255) NOT NULL COMMENT '盐值',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- ----------------------------
-- Records of accounts
-- ----------------------------
BEGIN;
INSERT INTO `accounts` VALUES ('YkhwmL4nnNqG3dkhsN5YDn', '16544445532', '浪湾', '994d45aefdd45045918d62781cea050907ee53d9', 'Q,1bZwhJGD~kLAi7');
COMMIT;

-- ----------------------------
-- Table structure for blocks
-- ----------------------------
DROP TABLE IF EXISTS `blocks`;
CREATE TABLE `blocks` (
  `key` varchar(255) NOT NULL,
  `goods_id` varchar(255) NOT NULL,
  PRIMARY KEY (`key`,`goods_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- ----------------------------
-- Records of blocks
-- ----------------------------
BEGIN;
INSERT INTO `blocks` VALUES ('pc', '1');
INSERT INTO `blocks` VALUES ('pc', '2');
INSERT INTO `blocks` VALUES ('phone', '2');
INSERT INTO `blocks` VALUES ('phone', '3');
COMMIT;

-- ----------------------------
-- Table structure for goods
-- ----------------------------
DROP TABLE IF EXISTS `goods`;
CREATE TABLE `goods` (
  `id` varchar(255) NOT NULL,
  `name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `img` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `price` decimal(10,2) NOT NULL,
  `original_price` decimal(10,2) NOT NULL,
  `desc` varchar(255) NOT NULL,
  `created_at` datetime(3) NOT NULL,
  `updated_at` datetime(3) NOT NULL,
  `deleted_at` datetime(3) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- ----------------------------
-- Records of goods
-- ----------------------------
BEGIN;
INSERT INTO `goods` VALUES ('1', 'Redmi 12C', 'https://cdn.cnbj0.fds.api.mi-img.com/b2c-shopapi-pms/pms_1672368924.0631125.png', 699.99, 799.99, '高性能长续航，5000万像素超清双摄，全新多彩配色', '2023-03-09 21:02:15.000', '2023-03-09 21:02:13.000', NULL);
INSERT INTO `goods` VALUES ('2', 'Redmi 12C', 'https://cdn.cnbj0.fds.api.mi-img.com/b2c-shopapi-pms/pms_1672368924.0631125.png', 699.00, 799.00, '高性能长续航，5000万像素超清双摄，全新多彩配色', '2023-03-09 21:02:15.000', '2023-03-09 21:02:13.000', NULL);
COMMIT;

SET FOREIGN_KEY_CHECKS = 1;
