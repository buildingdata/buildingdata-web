package com.mobisys.building.entity;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class NonHeatingAirIndoorCalculationParametersInfo {
    private Integer stationId;
    private String typeAndLevel;
    private Double winterDesignTemperature;
    private Double summerDesignTemperature;
    private String winterRelativeHumidity;
    private String summerRelativeHumidity;
}
