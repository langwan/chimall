/*
 Navicat Premium Data Transfer

 Source Server         : docker-local
 Source Server Type    : MySQL
 Source Server Version : 80032 (8.0.32)
 Source Host           : localhost:3306
 Source Schema         : chimall

 Target Server Type    : MySQL
 Target Server Version : 80032 (8.0.32)
 File Encoding         : 65001

 Date: 11/03/2023 17:50:00
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
INSERT INTO `accounts` (`id`, `phone`, `nickname`, `password`, `salt`) VALUES ('YkhwmL4nnNqG3dkhsN5YDn', '16544445532', '浪湾', '994d45aefdd45045918d62781cea050907ee53d9', 'Q,1bZwhJGD~kLAi7');
INSERT INTO `accounts` (`id`, `phone`, `nickname`, `password`, `salt`) VALUES ('YPBFYLCPMGNxAjAbFFiehc', '15507911191', 'sunlee', 'be9e39fea598bbacb8cfb62be220f88b2b151a6d', 'Vq}xY0F:oHzjQC[y');
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
INSERT INTO `blocks` (`key`, `goods_id`) VALUES ('pc', '1');
INSERT INTO `blocks` (`key`, `goods_id`) VALUES ('pc', '2');
INSERT INTO `blocks` (`key`, `goods_id`) VALUES ('phone', '2');
INSERT INTO `blocks` (`key`, `goods_id`) VALUES ('phone', '3');
INSERT INTO `blocks` (`key`, `goods_id`) VALUES ('slides', '1');
INSERT INTO `blocks` (`key`, `goods_id`) VALUES ('slides', '2');
INSERT INTO `blocks` (`key`, `goods_id`) VALUES ('slides', '3');
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
  `swiper_img` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- ----------------------------
-- Records of goods
-- ----------------------------
BEGIN;
INSERT INTO `goods` (`id`, `name`, `img`, `price`, `original_price`, `desc`, `created_at`, `updated_at`, `deleted_at`, `swiper_img`) VALUES ('1', 'Redmi 12C', 'https://cdn.cnbj0.fds.api.mi-img.com/b2c-shopapi-pms/pms_1672368924.0631125.png', 699.99, 799.99, '高性能长续航，5000万像素超清双摄，全新多彩配色', '2023-03-09 21:02:15.000', '2023-03-09 21:02:13.000', NULL, 'https://cdn.cnbj1.fds.api.mi-img.com/mi-mall/5ee39da0bc802e61046ef16524deb326.jpg?thumb=1&w=1226&h=460&f=webp&q=90');
INSERT INTO `goods` (`id`, `name`, `img`, `price`, `original_price`, `desc`, `created_at`, `updated_at`, `deleted_at`, `swiper_img`) VALUES ('2', 'Redmi 12C', 'https://cdn.cnbj0.fds.api.mi-img.com/b2c-shopapi-pms/pms_1672368924.0631125.png', 699.00, 799.00, '高性能长续航，5000万像素超清双摄，全新多彩配色', '2023-03-09 21:02:15.000', '2023-03-09 21:02:13.000', NULL, 'https://cdn.cnbj1.fds.api.mi-img.com/mi-mall/0b7e5c1fd6c74380d4d6c7036490e46f.jpg?thumb=1&w=1226&h=460&f=webp&q=90');
INSERT INTO `goods` (`id`, `name`, `img`, `price`, `original_price`, `desc`, `created_at`, `updated_at`, `deleted_at`, `swiper_img`) VALUES ('3', 'Redmi 12C', 'https://cdn.cnbj0.fds.api.mi-img.com/b2c-shopapi-pms/pms_1672368924.0631125.png', 699.00, 799.00, '高性能长续航，5000万像素超清双摄，全新多彩配色', '2023-03-09 21:02:15.000', '2023-03-09 21:02:13.000', NULL, NULL);
COMMIT;

SET FOREIGN_KEY_CHECKS = 1;
