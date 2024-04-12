package com.mobisys.building.entity;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class SimultaneousParamInfo {
    private Integer stationId;
    private Integer id;
    private String year;
    //private Integer time;
    private String direction;
    private String wallType;
    private String windowType;
    private Double wallWindow;
    private Double SHGCO;
    private Double ventilation;
    private Double indoorTem;
    private Integer r;
    private Double inCover;
    private Double radiation;
    private Double outSurAbsorb;
    private String room;
//    private String areaHeat;新数据删去了得热
    private String areaLoad;
    private String dryTem;
    private String WetTem;
    private String totalRadiation;

    @Override
    public String toString() {
        return "SimultaneousParamInfo{" +
                "stationId=" + stationId +
                ", year='" + year + '\'' +
                ", direction='" + direction + '\'' +
                ", wallType='" + wallType + '\'' +
                ", windowType='" + windowType + '\'' +
                ", wallWindow=" + wallWindow +
                ", SHGCO=" + SHGCO +
                ", ventilation=" + ventilation +
                ", indoorTem=" + indoorTem +
                ", r=" + r +
                ", inCover=" + inCover +
                ", radiation=" + radiation +
                ", outSurAbsorb=" + outSurAbsorb +
                ", room='" + room + '\'' +
                ", areaLoad='" + areaLoad + '\'' +
                ", dryTem='" + dryTem + '\'' +
                ", WetTem='" + WetTem + '\'' +
                ", totalRadiation='" + totalRadiation + '\'' +
                '}';
    }
}
