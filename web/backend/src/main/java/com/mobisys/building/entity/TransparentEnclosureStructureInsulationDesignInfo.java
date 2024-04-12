package com.mobisys.building.entity;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class TransparentEnclosureStructureInsulationDesignInfo {
    private Integer stationId;
    private String climateZones;
    private String kValue;
    private String resistanceToCondensation;
    private String basicThermalComfort;
}
