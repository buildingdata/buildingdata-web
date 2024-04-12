package com.mobisys.building.entity;

import lombok.Getter;
import lombok.Setter;

import java.sql.Date;

@Setter
@Getter
public class OpcNormpInfo {
    private Integer stationId;
    private Integer years;
    private Double yearAveTem;
    private Double temperHeatOut;
    private Double temperWinVenOut;
    private Double temperWinAirOut;
    private Double humidityWinAirRelative;
    private Double temperSumAirDry;
    private Double temperSumAirHum;
    private Double temperSumVenOut;
    private Double humiditySumVenRelative;
    private Double temperSumAirDayAve;
    private Double windSpeedSumAve;
    private String windDirectSumMost;
    private String windDirectSumMostFre;
    private Double windSpeedSumMostAve;
    private Double windSpeedWinAve;
    private String windDirectWinMost;
    private String windDirectWinMostFre;
    private Double windSpeedWinMostAve;
    private String windDirectYearMost;
    private String windDirectYearMostFre;
    private Double sunlightWinPer;
    private Double deepFrozenMost;
    private Double atmosWinOut;
    private Double atmosSumOut;
    private Integer temperDayAveLess5Day;
    private Date temperDayAveLess5be;
    private Double temperAveLess5Ave;
    private Integer temperDayAveLess8Day;
    private Date temperDayAveLess8be;
    private Double temperAveLess8Ave;
    private Double temperMax;
    private Double temperMin;

}
