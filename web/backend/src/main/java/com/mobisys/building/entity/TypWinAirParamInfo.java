package com.mobisys.building.entity;

import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
/**
 * 冬夏季典型设计气象日参数——冬季空调室外计算参数——参数表实体类（日较差）
 */
public class TypWinAirParamInfo {
    private Integer stationId;
    private Double param1;
    private Double param2;
    private Double param3;

    public Integer getStationId() {
        return stationId;
    }

    public void setStationId(Integer stationId) {
        this.stationId = stationId;
    }

    public Double getParam1() {
        return param1;
    }

    public void setParam1(Double param1) {
        this.param1 = param1;
    }

    public Double getParam2() {
        return param2;
    }

    public void setParam2(Double param2) {
        this.param2 = param2;
    }

    public Double getParam3() {
        return param3;
    }

    public void setParam3(Double param3) {
        this.param3 = param3;
    }
}
