package com.mobisys.building.entity;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.Getter;
import lombok.Setter;

/**
 * 模拟计算分析用参数
 * 对应数据库表icap
 */
@Getter
@Setter
@JsonIgnoreProperties(value = {"hibernateLazyInitializer", "handler"})
public class IndoorComputeParamInfo {

    private Integer stationId;
    private String archType;
    private String archLevel;
    private Double hotHighTemp;
    private Double hotLowTemp;
    private Double coldHighTemp;
    private Double coldLowTemp;

}
