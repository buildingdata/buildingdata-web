package com.mobisys.building.entity;

import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
public class localDisconforInfo {
    private String level;
    private Double windSpeedMostWin;
    private Double windSpeedMostSum;
    private Double blowUnsatiRate;
    private Double vertTempUnsatiRate;
    private Double vertTempInequal;
    private Double GroTempUnsatiRate;
    private String groudTempRange;
    private Double nonRadUnsatiRate;
    private String nonRadHotCeil;
    private String nonRadColdWall;
    private String nonRadColdCeil;
    private String nonRadHotWall;

}
