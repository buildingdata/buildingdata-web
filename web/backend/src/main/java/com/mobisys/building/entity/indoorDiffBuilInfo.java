package com.mobisys.building.entity;

import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
public class indoorDiffBuilInfo {
    private String type;
    private String Level;
    private Double limitLowHeatTemp;
    private Double limitUpHeatTemp;
}
