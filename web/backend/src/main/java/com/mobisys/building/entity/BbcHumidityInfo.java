package com.mobisys.building.entity;

import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
public class BbcHumidityInfo {
    private Integer stationId;
    private Integer month;
    private float averageHum;
    private float averageMaxHum;
    private float averageMinHum;
    
}
