package com.mobisys.building.entity;


import lombok.Getter;
import lombok.Setter;

//@Getter
//@Setter
public class OtmccInfo {
    private Integer stationId;
    private Integer time;
    private Double outdoorAirTep;
    private Double horizontal;
    private Double east;
    private Double south;
    private Double west;
    private Double north;

    public Integer getStationId() {
        return stationId;
    }

    public void setStationId(Integer stationId) {
        this.stationId = stationId;
    }

    public Integer getTime() {
        return time;
    }

    public void setTime(Integer time) {
        this.time = time;
    }

    public Double getOutdoorAirTep() {
        return outdoorAirTep;
    }

    public void setOutdoorAirTep(Double outdoorAirTep) {
        this.outdoorAirTep = outdoorAirTep;
    }

    public Double getHorizontal() {
        return horizontal;
    }

    public void setHorizontal(Double horizontal) {
        this.horizontal = horizontal;
    }

    public Double getEast() {
        return east;
    }

    public void setEast(Double east) {
        this.east = east;
    }

    public Double getSouth() {
        return south;
    }

    public void setSouth(Double south) {
        this.south = south;
    }

    public Double getWest() {
        return west;
    }

    public void setWest(Double west) {
        this.west = west;
    }

    public Double getNorth() {
        return north;
    }

    public void setNorth(Double north) {
        this.north = north;
    }
}
