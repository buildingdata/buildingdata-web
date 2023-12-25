package com.mobisys.building.entity;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class BbcSolarradiationInfo {
    private Integer stationId;
    private Integer month;
    private Double horRadTotal;
    private Double horRadDirect;
    private Double horRadScattering;

}
