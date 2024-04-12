package com.mobisys.building.entity;

import lombok.Getter;
import lombok.Setter;

//@Getter
//@Setter
public class OcpehhccInfo {
    private Integer stationId;
 //   private Integer year;
    private Integer month;
    private Integer day;
    private Integer time;
    private Integer dbt;
    private Integer pre;
    private Integer rhm;
    private Integer wDir;
    private Integer wSpd;
    private Integer dpt;
//    private Integer wbt;
    private Double gsr;
    private Double dif;
    private Double dir;
    private Double pct;
    private Double cc;

    public Integer getStationId() {
        return stationId;
    }

    public void setStationId(Integer stationId) {
        this.stationId = stationId;
    }


    public Integer getMonth() {
        return month;
    }

    public void setMonth(Integer month) {
        this.month = month;
    }

    public Integer getDay() {
        return day;
    }

    public void setDay(Integer day) {
        this.day = day;
    }

    public Integer getTime() {
        return time;
    }

    public void setTime(Integer time) {
        this.time = time;
    }

    public Integer getDbt() {
        return dbt;
    }

    public void setDbt(Integer dbt) {
        this.dbt = dbt;
    }

    public Integer getPre() {
        return pre;
    }

    public void setPre(Integer pre) {
        this.pre = pre;
    }

    public Integer getRhm() {
        return rhm;
    }

    public void setRhm(Integer rhm) {
        this.rhm = rhm;
    }

    public Integer getwDir() {
        return wDir;
    }

    public void setwDir(Integer wDir) {
        this.wDir = wDir;
    }

    public Integer getwSpd() {
        return wSpd;
    }

    public void setwSpd(Integer wSpd) {
        this.wSpd = wSpd;
    }

    public Integer getDpt() {
        return dpt;
    }

    public void setDpt(Integer dpt) {
        this.dpt = dpt;
    }
    

    public Double getGsr() {
        return gsr;
    }

    public void setGsr(Double gsr) {
        this.gsr = gsr;
    }

    public Double getDif() {
        return dif;
    }

    public void setDif(Double dif) {
        this.dif = dif;
    }

    public Double getDir() {
        return dir;
    }

    public void setDir(Double dir) {
        this.dir = dir;
    }

    public Double getPct() {
        return pct;
    }

    public void setPct(Double pct) {
        this.pct = pct;
    }
    public Double getCc() {
        return cc;
    }

    public void setCc(Double cc) {
        this.cc = cc;
    }

    //    private Double outdoorAirTemperature;
//    private Integer relativeHumidity;
//    private Double rainfall;
//    private String windDirection;
//    private Double windSpeed;
//    private Integer atmosphericPressure;
}
