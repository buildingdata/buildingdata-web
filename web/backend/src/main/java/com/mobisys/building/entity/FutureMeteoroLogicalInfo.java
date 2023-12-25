package com.mobisys.building.entity;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class FutureMeteoroLogicalInfo {
    private Integer stationId;
    private Integer month;
    private Integer day;
    private Integer time;
    private Integer pressure;
    private Double dryTemper;
    private Integer relativeSolid;
    private Double pointTemper;
    private Integer windDirection;
    private Double windSpeed;
    private Integer Cloudiness;
    private Double sunSumRadiation;
    private Double directRadiation;
    private Double scatterRadiation;
}
