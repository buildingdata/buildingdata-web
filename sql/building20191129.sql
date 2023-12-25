/*
Navicat MySQL Data Transfer

Source Server         : hyb
Source Server Version : 50719
Source Host           : localhost:3306
Source Database       : building

Target Server Type    : MYSQL
Target Server Version : 50719
File Encoding         : 65001

Date: 2019-11-29 14:46:40
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for `enclosure_structure_envelope_design`
-- ----------------------------
DROP TABLE IF EXISTS `enclosure_structure_envelope_design`;
CREATE TABLE `enclosure_structure_envelope_design` (
  `station_id` int(11) NOT NULL,
  `structure_name` varchar(11) DEFAULT NULL COMMENT '结构名称',
  `param1` double(11,1) DEFAULT NULL COMMENT '内表面最高温度（℃）。属于：围护结构名称——外墙;房间类型——空调房间，重质（D≥2.5）',
  `param2` double(11,1) DEFAULT NULL COMMENT '内表面最高温度（℃）。属于：围护结构名称——外墙;房间类型——空调房间，轻质（D＜2.5)',
  `param3` double(11,1) DEFAULT NULL COMMENT '内表面最高温度（℃）。属于：围护结构名称——外墙;房间类型——自然通风房间',
  `param4` double(11,1) DEFAULT NULL COMMENT '内表面最高温度（℃）。属于：围护结构名称——屋顶;房间类型——空调房间，重质（D≥2.5）',
  `param5` double(11,1) DEFAULT NULL COMMENT '内表面最高温度（℃）。属于：围护结构名称——屋顶;房间类型——空调房间，轻质（D＜2.5)',
  `param6` double(11,1) DEFAULT NULL COMMENT '内表面最高温度（℃）。属于：围护结构名称——屋顶;房间类型——自然通风房间',
  PRIMARY KEY (`station_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of enclosure_structure_envelope_design
-- ----------------------------
INSERT INTO `enclosure_structure_envelope_design` VALUES ('57131', '内表面最高温度', '36.0', '36.0', '36.0', '36.0', '36.0', '36.0');

-- ----------------------------
-- Table structure for `enclosure_structure_insulation_design`
-- ----------------------------
DROP TABLE IF EXISTS `enclosure_structure_insulation_design`;
CREATE TABLE `enclosure_structure_insulation_design` (
  `station_id` int(11) NOT NULL,
  `enclosure_structure` varchar(11) NOT NULL COMMENT '围护结构:墙体、楼、屋面、地面、地下室',
  `basic_thermal_comfort` varchar(11) DEFAULT NULL COMMENT '基本热舒适（℃）',
  PRIMARY KEY (`station_id`,`enclosure_structure`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of enclosure_structure_insulation_design
-- ----------------------------
INSERT INTO `enclosure_structure_insulation_design` VALUES ('57131', '地下室', '≤4');
INSERT INTO `enclosure_structure_insulation_design` VALUES ('57131', '地面', '≤2');
INSERT INTO `enclosure_structure_insulation_design` VALUES ('57131', '墙体', '≤3');
INSERT INTO `enclosure_structure_insulation_design` VALUES ('57131', '楼、屋面', '≤4');

-- ----------------------------
-- Table structure for `heating_air_indoor_calculation_parameters`
-- ----------------------------
DROP TABLE IF EXISTS `heating_air_indoor_calculation_parameters`;
CREATE TABLE `heating_air_indoor_calculation_parameters` (
  `station_id` int(11) NOT NULL,
  `type_and_level` varchar(11) NOT NULL COMMENT '建筑/房间类型和级别：类型有居住建筑、办公建筑、商场。级别有Ⅰ、Ⅱ、Ⅲ。',
  `winter_design_temperature` double(11,1) DEFAULT NULL COMMENT '室内设计温度（℃）——冬季',
  `summer_design_temperature` double(11,1) DEFAULT NULL COMMENT '室内设计温度（℃）——夏季',
  `winter_relative_humidity` varchar(11) DEFAULT NULL COMMENT '相对湿度（%）——冬季',
  `summer_relative_humidity` varchar(11) DEFAULT NULL COMMENT '相对湿度（%）——夏季',
  PRIMARY KEY (`station_id`,`type_and_level`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of heating_air_indoor_calculation_parameters
-- ----------------------------
INSERT INTO `heating_air_indoor_calculation_parameters` VALUES ('57131', '办公Ⅰ', '20.0', '26.0', '30-60', '40-70');
INSERT INTO `heating_air_indoor_calculation_parameters` VALUES ('57131', '办公Ⅱ', '19.0', '27.0', '30-60', '40-70');
INSERT INTO `heating_air_indoor_calculation_parameters` VALUES ('57131', '办公Ⅲ', '17.0', '28.0', '30-60', '40-70');
INSERT INTO `heating_air_indoor_calculation_parameters` VALUES ('57131', '商场Ⅰ', '22.0', '24.0', '30-60', '40-70');
INSERT INTO `heating_air_indoor_calculation_parameters` VALUES ('57131', '商场Ⅱ', '18.0', '25.0', '30-60', '40-70');
INSERT INTO `heating_air_indoor_calculation_parameters` VALUES ('57131', '商场Ⅲ', '16.0', '26.0', '30-60', '40-70');
INSERT INTO `heating_air_indoor_calculation_parameters` VALUES ('57131', '居住Ⅰ', '18.0', '26.0', '30-60', '40-70');
INSERT INTO `heating_air_indoor_calculation_parameters` VALUES ('57131', '居住Ⅱ', '16.0', '27.0', '30-60', '40-70');
INSERT INTO `heating_air_indoor_calculation_parameters` VALUES ('57131', '居住Ⅲ', '12.0', '28.0', '30-60', '40-70');

-- ----------------------------
-- Table structure for `non_heating_air_indoor_calculation_parameters`
-- ----------------------------
DROP TABLE IF EXISTS `non_heating_air_indoor_calculation_parameters`;
CREATE TABLE `non_heating_air_indoor_calculation_parameters` (
  `station_id` int(11) NOT NULL,
  `type_and_level` varchar(11) NOT NULL COMMENT '建筑/房间类型和级别：类型有居住建筑、办公建筑。级别有Ⅰ、Ⅱ、Ⅲ。',
  `winter_design_temperature` double(11,1) DEFAULT NULL COMMENT '室内设计温度（℃）——冬季',
  `summer_design_temperature` double(11,1) DEFAULT NULL COMMENT '室内设计温度（℃）——夏季',
  `winter_relative_humidity` varchar(11) DEFAULT NULL COMMENT '相对湿度（%）——冬季',
  `summer_relative_humidity` varchar(11) DEFAULT NULL COMMENT '相对湿度（%）——夏季',
  PRIMARY KEY (`station_id`,`type_and_level`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of non_heating_air_indoor_calculation_parameters
-- ----------------------------
INSERT INTO `non_heating_air_indoor_calculation_parameters` VALUES ('57131', '办公Ⅰ', '20.0', '26.0', '30-60', '40-70');
INSERT INTO `non_heating_air_indoor_calculation_parameters` VALUES ('57131', '办公Ⅱ', '19.0', '27.0', '30-60', '40-70');
INSERT INTO `non_heating_air_indoor_calculation_parameters` VALUES ('57131', '办公Ⅲ', '17.0', '28.0', '30-60', '40-70');
INSERT INTO `non_heating_air_indoor_calculation_parameters` VALUES ('57131', '居住Ⅰ', '18.0', '26.0', '30-60', '40-70');
INSERT INTO `non_heating_air_indoor_calculation_parameters` VALUES ('57131', '居住Ⅱ', '16.0', '27.0', '30-60', '40-70');
INSERT INTO `non_heating_air_indoor_calculation_parameters` VALUES ('57131', '居住Ⅲ', '12.0', '28.0', '30-60', '40-70');

-- ----------------------------
-- Table structure for `passive_solar_building_design_parameters`
-- ----------------------------
DROP TABLE IF EXISTS `passive_solar_building_design_parameters`;
CREATE TABLE `passive_solar_building_design_parameters` (
  `station_id` int(11) NOT NULL,
  `type` varchar(11) NOT NULL COMMENT '类型：只采取被动措施、采取主动措施',
  `winter_heating_calculation_temperature` varchar(11) DEFAULT NULL COMMENT '冬季采暖计算温度（℃）',
  `summer_cooling_calculation_temperature` varchar(11) DEFAULT NULL COMMENT '夏季降温计算温度（℃）',
  `summer_hot_and_humid_areas` varchar(11) DEFAULT NULL COMMENT '夏季高温高湿地区（℃）',
  PRIMARY KEY (`station_id`,`type`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of passive_solar_building_design_parameters
-- ----------------------------
INSERT INTO `passive_solar_building_design_parameters` VALUES ('57131', '只采取主动措施', '18', '26', '26');
INSERT INTO `passive_solar_building_design_parameters` VALUES ('57131', '只采取被动措施', '16', '28', '28');

-- ----------------------------
-- Table structure for `transparent_enclosure_structure_insulation_design`
-- ----------------------------
DROP TABLE IF EXISTS `transparent_enclosure_structure_insulation_design`;
CREATE TABLE `transparent_enclosure_structure_insulation_design` (
  `station_id` int(11) NOT NULL,
  `climate_zones` varchar(11) NOT NULL COMMENT '气候区',
  `k_value` varchar(11) DEFAULT NULL COMMENT 'K[W/(m2·K)]',
  `resistance_to_condensation` varchar(11) DEFAULT NULL COMMENT '抗结露',
  `basic_thermal_comfort` varchar(11) DEFAULT NULL COMMENT '基本热舒适（℃）',
  PRIMARY KEY (`station_id`,`climate_zones`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of transparent_enclosure_structure_insulation_design
-- ----------------------------
INSERT INTO `transparent_enclosure_structure_insulation_design` VALUES ('57131', '严寒A区', '≤2.0', '验算', '无');
INSERT INTO `transparent_enclosure_structure_insulation_design` VALUES ('57131', '严寒B区', '≤2.2', '验算', '无');
INSERT INTO `transparent_enclosure_structure_insulation_design` VALUES ('57131', '严寒C区', '≤2.5', '验算', '无');
INSERT INTO `transparent_enclosure_structure_insulation_design` VALUES ('57131', '夏热冬冷A区', '≤3.5', '验算', '无');
INSERT INTO `transparent_enclosure_structure_insulation_design` VALUES ('57131', '夏热冬冷B区', '≤4.0', '验算', '无');
INSERT INTO `transparent_enclosure_structure_insulation_design` VALUES ('57131', '夏热冬暖A区', '-', '不验算', '无');
INSERT INTO `transparent_enclosure_structure_insulation_design` VALUES ('57131', '夏热冬暖B区', '-', '不验算', '无');
INSERT INTO `transparent_enclosure_structure_insulation_design` VALUES ('57131', '寒冷A区', '≤3.0', '验算', '无');
INSERT INTO `transparent_enclosure_structure_insulation_design` VALUES ('57131', '寒冷B区', '≤3.0', '验算', '无');
INSERT INTO `transparent_enclosure_structure_insulation_design` VALUES ('57131', '温和A区', '≤3.5', '验算', '无');
INSERT INTO `transparent_enclosure_structure_insulation_design` VALUES ('57131', '温和B区', '-', '不验算', '无');
