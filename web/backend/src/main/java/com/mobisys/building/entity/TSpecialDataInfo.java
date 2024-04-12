package com.mobisys.building.entity;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
//典型年数据实体
public class TSpecialDataInfo {
    private Integer stationId;
    private Integer year;
    private Integer month;
    private Integer day;
    private String type;   //数据类型（大气压：app、干球温度：dbt、露点温度：dpt、相对湿度：rhm、太阳总辐射：tsr、法向直射辐射：ndr、水平面散射辐射：hsr、云量：cc、风速：ws、风向：wd）
    private Double h1;
    private Double h2;
    private Double h3;
    private Double h4;
    private Double h5;
    private Double h6;
    private Double h7;
    private Double h8;
    private Double h9;
    private Double h10;
    private Double h11;
    private Double h12;
    private Double h13;
    private Double h14;
    private Double h15;
    private Double h16;
    private Double h17;
    private Double h18;
    private Double h19;
    private Double h20;
    private Double h21;
    private Double h22;
    private Double h23;
    private Double h24;
}
