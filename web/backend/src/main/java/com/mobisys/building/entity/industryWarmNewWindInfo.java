package com.mobisys.building.entity;

import lombok.Getter;
import lombok.Setter;

import java.sql.Date;
@Setter
@Getter
public class industryWarmNewWindInfo {
    private Integer stationId;
    private String year;
    private Double  maxTemperAvg;
    private Double  minTemperAvg;
    private Double  MaxMonthAvg;
    private Double  minDayAvg;
}
