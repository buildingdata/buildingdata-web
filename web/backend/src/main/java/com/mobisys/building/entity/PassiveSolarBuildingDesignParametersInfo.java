package com.mobisys.building.entity;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class PassiveSolarBuildingDesignParametersInfo {
    private Integer stationId;
    private String type;
    private String winterHeatingCalculationTemperature;
    private String summerCoolingCalculationTemperature;
    private String summerHotAndHumidAreas;
}
