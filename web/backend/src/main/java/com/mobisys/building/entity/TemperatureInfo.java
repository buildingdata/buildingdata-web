package com.mobisys.building.entity;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class TemperatureInfo {
    private Integer stationId;
    private String paramType;
    private Double dayAvgMonthAvg;
    private Double dayMaxMonthAvg;
    private Double dayMinMonthAvg;
    private Double dayMax;
    private Double dayMin;
}
