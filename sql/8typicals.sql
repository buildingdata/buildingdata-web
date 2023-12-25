/*
Navicat MySQL Data Transfer

Source Server         : 本地数据库
Source Server Version : 50714
Source Host           : localhost:3306
Source Database       : building

Target Server Type    : MYSQL
Target Server Version : 50714
File Encoding         : 65001

Date: 2019-10-30 12:15:37
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for `t_typical_summer_airconditioner_parma`
-- ----------------------------
DROP TABLE IF EXISTS `t_typical_summer_airconditioner_parma`;
CREATE TABLE `t_typical_summer_airconditioner_parma` (
  `station_id` int(11) NOT NULL COMMENT '台站号，主键',
  `parma1` double(11,1) DEFAULT NULL COMMENT '参数一',
  `parma2` double(11,1) DEFAULT NULL COMMENT '参数二',
  `parma3` double(11,1) DEFAULT NULL COMMENT '参数三',
  `parma4` double(11,1) DEFAULT NULL COMMENT '参数四',
  `parma5` double(11,1) DEFAULT NULL COMMENT '参数五',
  `parma6` double(11,1) DEFAULT NULL COMMENT '参数六',
  `parma7` double(11,1) DEFAULT NULL COMMENT '参数七',
  `parma8` double(11,1) DEFAULT NULL COMMENT '参数八',
  `parma9` double(11,1) DEFAULT NULL COMMENT '参数九',
  PRIMARY KEY (`station_id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of t_typical_summer_airconditioner_parma
-- ----------------------------

-- ----------------------------
-- Table structure for `t_typical_summer_dehumidification_parma`
-- ----------------------------
DROP TABLE IF EXISTS `t_typical_summer_dehumidification_parma`;
CREATE TABLE `t_typical_summer_dehumidification_parma` (
  `station_id` int(11) NOT NULL COMMENT '台站号，主键',
  `parma1` double(11,1) DEFAULT NULL COMMENT '参数一',
  `parma2` double(11,1) DEFAULT NULL COMMENT '参数二',
  `parma3` double(11,1) DEFAULT NULL COMMENT '参数三',
  `parma4` double(11,1) DEFAULT NULL COMMENT '参数四',
  `parma5` double(11,1) DEFAULT NULL COMMENT '参数五',
  `parma6` double(11,1) DEFAULT NULL COMMENT '参数六',
  `parma7` double(11,1) DEFAULT NULL COMMENT '参数七',
  `parma8` double(11,1) DEFAULT NULL COMMENT '参数八',
  `parma9` double(11,1) DEFAULT NULL COMMENT '参数九',
  PRIMARY KEY (`station_id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of t_typical_summer_dehumidification_parma
-- ----------------------------

-- ----------------------------
-- Table structure for `t_typical_summer_airconditioner_time`
-- ----------------------------
DROP TABLE IF EXISTS `t_typical_summer_airconditioner_time`;
CREATE TABLE `t_typical_summer_airconditioner_time` (
  `station_id` int(11) NOT NULL COMMENT '台站号，主键',
  `parma_type` int(5) NOT NULL COMMENT '参数类型，1：干球温度逐时变化系数；2：湿球温度逐时变化系数；3：太阳辐射逐时变化系数；4：累年平均每年不保证10小时，干球温度列；5：累年平均每年不保证10小时，湿球温度列；6：累年平均每年不保证50小时，干球温度列；7：累年平均每年不保证50小时，湿球温度列；8：累年平均每年不保证100小时，干球温度列；9：累年平均每年不保证100小时，湿球温度列；10：累年平均每年不保证10小时，太阳辐射直射辐射列；11：累年平均每年不保证10小时，太阳辐射散射辐射列；12：累年平均每年不保证10小时，太阳辐射总辐射列；13：累年平均每年不保证50小时，太阳辐射直射辐射列：14：累年平均每年不保证50小时，太阳辐射散射辐射列；15：累年平均每年不保证50小时，太阳辐射总辐射列；16：累年平均每年不保证100小时，太阳辐射直射辐射列；17：累年平均每年不保证100小时，太阳辐射散射辐射列；18：累年平均每年不保证100小时，太阳辐射总辐射列；',
  `t1` double(11,8) DEFAULT NULL COMMENT '一点数据',
  `t2` double(11,8) DEFAULT NULL COMMENT '二点数据',
  `t3` double(11,8) DEFAULT NULL COMMENT '三点数据',
  `t4` double(11,8) DEFAULT NULL COMMENT '四点数据',
  `t5` double(11,8) DEFAULT NULL COMMENT '五点数据',
  `t6` double(11,8) DEFAULT NULL COMMENT '六点数据',
  `t7` double(11,8) DEFAULT NULL COMMENT '七点数据',
  `t8` double(11,8) DEFAULT NULL COMMENT '八点数据',
  `t9` double(11,8) DEFAULT NULL COMMENT '九点数据',
  `t10` double(11,8) DEFAULT NULL COMMENT '十点数据',
  `t11` double(11,8) DEFAULT NULL COMMENT '十一点数据',
  `t12` double(11,8) DEFAULT NULL COMMENT '十二点数据',
  `t13` double(11,8) DEFAULT NULL COMMENT '十三点数据',
  `t14` double(11,8) DEFAULT NULL COMMENT '十四点数据',
  `t15` double(11,8) DEFAULT NULL COMMENT '十五点数据',
  `t16` double(11,8) DEFAULT NULL COMMENT '十六点数据',
  `t17` double(11,8) DEFAULT NULL COMMENT '十七点数据',
  `t18` double(11,8) DEFAULT NULL COMMENT '十八点数据',
  `t19` double(11,8) DEFAULT NULL COMMENT '十九点数据',
  `t20` double(11,8) DEFAULT NULL COMMENT '二十点数据',
  `t21` double(11,8) DEFAULT NULL COMMENT '二十一点数据',
  `t22` double(11,8) DEFAULT NULL COMMENT '二十二点数据',
  `t23` double(11,8) DEFAULT NULL COMMENT '二十三点数据',
  `t24` double(11,8) DEFAULT NULL COMMENT '二十四点数据',
  PRIMARY KEY (`station_id`,`parma_type`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of t_typical_summer_airconditioner_time
-- ----------------------------

-- ----------------------------
-- Table structure for `t_typical_summer_dehumidification_time`
-- ----------------------------
DROP TABLE IF EXISTS `t_typical_summer_dehumidification_time`;
CREATE TABLE `t_typical_summer_dehumidification_time` (
  `station_id` int(11) NOT NULL COMMENT '台站号，主键',
  `parma_type` int(5) NOT NULL COMMENT '参数类型，1：含湿量逐时变化系数列；2：干球温度逐时变化系数列；3：累年平均每年不保证10小时，含湿量列；4：累年平均每年不保证10小时，干球温度列；5：累年平均每年不保证10小时，相对湿度列；6：累年平均每年不保证50小时，含湿量列；7：累年平均每年不保证50小时，干球温度列；8：累年平均每年不保证50小时，相对湿度列；9：累年平均每年不保证100小时，含湿量列；10：累年平均每年不保证100小时，干球温度列；11：累年平均每年不保证100小时，相对湿度列；',
  `t1` double(11,8) DEFAULT NULL COMMENT '一点数据',
  `t2` double(11,8) DEFAULT NULL COMMENT '二点数据',
  `t3` double(11,8) DEFAULT NULL COMMENT '三点数据',
  `t4` double(11,8) DEFAULT NULL COMMENT '四点数据',
  `t5` double(11,8) DEFAULT NULL COMMENT '五点数据',
  `t6` double(11,8) DEFAULT NULL COMMENT '六点数据',
  `t7` double(11,8) DEFAULT NULL COMMENT '七点数据',
  `t8` double(11,8) DEFAULT NULL COMMENT '八点数据',
  `t9` double(11,8) DEFAULT NULL COMMENT '九点数据',
  `t10` double(11,8) DEFAULT NULL COMMENT '十点数据',
  `t11` double(11,8) DEFAULT NULL COMMENT '十一点数据',
  `t12` double(11,8) DEFAULT NULL COMMENT '十二点数据',
  `t13` double(11,8) DEFAULT NULL COMMENT '十三点数据',
  `t14` double(11,8) DEFAULT NULL COMMENT '十四点数据',
  `t15` double(11,8) DEFAULT NULL COMMENT '十五点数据',
  `t16` double(11,8) DEFAULT NULL COMMENT '十六点数据',
  `t17` double(11,8) DEFAULT NULL COMMENT '十七点数据',
  `t18` double(11,8) DEFAULT NULL COMMENT '十八点数据',
  `t19` double(11,8) DEFAULT NULL COMMENT '十九点数据',
  `t20` double(11,8) DEFAULT NULL COMMENT '二十点数据',
  `t21` double(11,8) DEFAULT NULL COMMENT '二十一点数据',
  `t22` double(11,8) DEFAULT NULL COMMENT '二十二点数据',
  `t23` double(11,8) DEFAULT NULL COMMENT '二十三点数据',
  `t24` double(11,8) DEFAULT NULL COMMENT '二十四点数据',
  PRIMARY KEY (`station_id`,`parma_type`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of t_typical_summer_dehumidification_time
-- ----------------------------

-- ----------------------------
-- Table structure for `t_typical_winter_airconditioner_parma`
-- ----------------------------
DROP TABLE IF EXISTS `t_typical_winter_airconditioner_parma`;
CREATE TABLE `t_typical_winter_airconditioner_parma` (
  `station_id` int(11) NOT NULL COMMENT '台站号，主键',
  `parma1` double(11,1) DEFAULT NULL COMMENT '参数一',
  `parma2` double(11,1) DEFAULT NULL COMMENT '参数二',
  `parma3` double(11,1) DEFAULT NULL COMMENT '参数三',
  PRIMARY KEY (`station_id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of t_typical_winter_airconditioner_parma
-- ----------------------------

-- ----------------------------
-- Table structure for `t_typical_winter_airconditioner_time`
-- ----------------------------
DROP TABLE IF EXISTS `t_typical_winter_airconditioner_time`;
CREATE TABLE `t_typical_winter_airconditioner_time` (
  `station_id` int(11) NOT NULL COMMENT '台站号，主键',
  `parma_type` int(5) NOT NULL COMMENT '参数类型，1：逐时变化系数；2：累年平均每年不保证6小时列，但不包含日均值。；3：累年平均每年不保证24小时，但不包含日均值。；4：累年平均每年不保证48小时，但不包含日均值。',
  `t1` double(11,8) DEFAULT NULL COMMENT '一点数据',
  `t2` double(11,8) DEFAULT NULL COMMENT '二点数据',
  `t3` double(11,8) DEFAULT NULL COMMENT '三点数据',
  `t4` double(11,8) DEFAULT NULL COMMENT '四点数据',
  `t5` double(11,8) DEFAULT NULL COMMENT '五点数据',
  `t6` double(11,8) DEFAULT NULL COMMENT '六点数据',
  `t7` double(11,8) DEFAULT NULL COMMENT '七点数据',
  `t8` double(11,8) DEFAULT NULL COMMENT '八点数据',
  `t9` double(11,8) DEFAULT NULL COMMENT '九点数据',
  `t10` double(11,8) DEFAULT NULL COMMENT '十点数据',
  `t11` double(11,8) DEFAULT NULL COMMENT '十一点数据',
  `t12` double(11,8) DEFAULT NULL COMMENT '十二点数据',
  `t13` double(11,8) DEFAULT NULL COMMENT '十三点数据',
  `t14` double(11,8) DEFAULT NULL COMMENT '十四点数据',
  `t15` double(11,8) DEFAULT NULL COMMENT '十五点数据',
  `t16` double(11,8) DEFAULT NULL COMMENT '十六点数据',
  `t17` double(11,8) DEFAULT NULL COMMENT '十七点数据',
  `t18` double(11,8) DEFAULT NULL COMMENT '十八点数据',
  `t19` double(11,8) DEFAULT NULL COMMENT '十九点数据',
  `t20` double(11,8) DEFAULT NULL COMMENT '二十点数据',
  `t21` double(11,8) DEFAULT NULL COMMENT '二十一点数据',
  `t22` double(11,8) DEFAULT NULL COMMENT '二十二点数据',
  `t23` double(11,8) DEFAULT NULL COMMENT '二十三点数据',
  `t24` double(11,8) DEFAULT NULL COMMENT '二十四点数据',
  PRIMARY KEY (`station_id`,`parma_type`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of t_typical_winter_airconditioner_time
-- ----------------------------

-- ----------------------------
-- Table structure for `t_typical_winter_heating_parma`
-- ----------------------------
DROP TABLE IF EXISTS `t_typical_winter_heating_parma`;
CREATE TABLE `t_typical_winter_heating_parma` (
  `station_id` int(11) NOT NULL COMMENT '台站号，主键',
  `parma1` double(11,1) DEFAULT NULL COMMENT '参数一',
  `parma2` double(11,1) DEFAULT NULL COMMENT '参数二',
  `parma3` double(11,1) DEFAULT NULL COMMENT '参数三',
  PRIMARY KEY (`station_id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of t_typical_winter_heating_parma
-- ----------------------------

-- ----------------------------
-- Table structure for `t_typical_winter_heating_time`
-- ----------------------------
DROP TABLE IF EXISTS `t_typical_winter_heating_time`;
CREATE TABLE `t_typical_winter_heating_time` (
  `station_id` int(11) NOT NULL COMMENT '台站号，主键',
  `parma_type` int(5) NOT NULL COMMENT '参数类型，1：逐时变化系数；2：累年平均每天不保证1天列，但不包含日较差。；3：累年平均每天不保证5天列，但不包含日较差。；4：累年平均每天不保证10天列，但不包含日较差。',
  `t1` double(11,8) DEFAULT NULL COMMENT '一点数据',
  `t2` double(11,8) DEFAULT NULL COMMENT '二点数据',
  `t3` double(11,8) DEFAULT NULL COMMENT '三点数据',
  `t4` double(11,8) DEFAULT NULL COMMENT '四点数据',
  `t5` double(11,8) DEFAULT NULL COMMENT '五点数据',
  `t6` double(11,8) DEFAULT NULL COMMENT '六点数据',
  `t7` double(11,8) DEFAULT NULL COMMENT '七点数据',
  `t8` double(11,8) DEFAULT NULL COMMENT '八点数据',
  `t9` double(11,8) DEFAULT NULL COMMENT '九点数据',
  `t10` double(11,8) DEFAULT NULL COMMENT '十点数据',
  `t11` double(11,8) DEFAULT NULL COMMENT '十一点数据',
  `t12` double(11,8) DEFAULT NULL COMMENT '十二点数据',
  `t13` double(11,8) DEFAULT NULL COMMENT '十三点数据',
  `t14` double(11,8) DEFAULT NULL COMMENT '十四点数据',
  `t15` double(11,8) DEFAULT NULL COMMENT '十五点数据',
  `t16` double(11,8) DEFAULT NULL COMMENT '十六点数据',
  `t17` double(11,8) DEFAULT NULL COMMENT '十七点数据',
  `t18` double(11,8) DEFAULT NULL COMMENT '十八点数据',
  `t19` double(11,8) DEFAULT NULL COMMENT '十九点数据',
  `t20` double(11,8) DEFAULT NULL COMMENT '二十点数据',
  `t21` double(11,8) DEFAULT NULL COMMENT '二十一点数据',
  `t22` double(11,8) DEFAULT NULL COMMENT '二十二点数据',
  `t23` double(11,8) DEFAULT NULL COMMENT '二十三点数据',
  `t24` double(11,8) DEFAULT NULL COMMENT '二十四点数据',
  PRIMARY KEY (`station_id`,`parma_type`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of t_typical_winter_heating_time
-- ----------------------------
