package com.mobisys.building.entity;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class StationInfo {
    private Integer stationId;
    private String cityName;
    private String province;
    private Double latitude;
    private Double longitude;
    private Double altitude;
    private String climates;
    private Integer level;
}
