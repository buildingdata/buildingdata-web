package com.mobisys.building.entity;

import lombok.Getter;
import lombok.Setter;
import org.springframework.format.annotation.DateTimeFormat;

import java.util.Date;

@Getter
@Setter
public class ExtremMeteoroLogicalInfo {
    private Integer stationId;
    private Integer month;
    private Integer day;
    private Integer time;
    private Double pressure;
    private Double dryTemp;
    private Double pointTemper;
    private Double relativeHumidity;
    private Double sunSumRadiation;
    private Double directRadiation;
    private Double scatterRadiation;
    private Double cloudiness;
    private Double winSpeed;

    public Double getDryTemp() {
        return dryTemp;
    }

    public void setDryTemp(Double dryTemp) {
        this.dryTemp = dryTemp;
    }

    public Double getPointTemper() {
        return pointTemper;
    }

    public void setPointTemper(Double pointTemper) {
        this.pointTemper = pointTemper;
    }

    public Double getRelativeHumidity() {
        return relativeHumidity;
    }

    public void setRelativeHumidity(Double relativeHumidity) {
        this.relativeHumidity = relativeHumidity;
    }

    public Double getSunSumRadiation() {
        return sunSumRadiation;
    }

    public void setSunSumRadiation(Double sunSumRadiation) {
        this.sunSumRadiation = sunSumRadiation;
    }

    public Double getDirectRadiation() {
        return directRadiation;
    }

    public void setDirectRadiation(Double directRadiation) {
        this.directRadiation = directRadiation;
    }

    public Double getScatterRadiation() {
        return scatterRadiation;
    }

    public void setScatterRadiation(Double scatterRadiation) {
        this.scatterRadiation = scatterRadiation;
    }

    public Double getCloudiness() {
        return cloudiness;
    }

    public void setCloudiness(Double cloudiness) {
        this.cloudiness = cloudiness;
    }

    private Double winDirection;

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


    public Double getPressure() {
        return pressure;
    }

    public void setPressure(Double pressure) {
        this.pressure = pressure;
    }

    public Double getWinDirection() {
        return winDirection;
    }

    public void setWinDirection(Double winDirection) {
        this.winDirection = winDirection;
    }

    public Double getWinSpeed() {
        return winSpeed;
    }

    public void setWinSpeed(Double winSpeed) {
        this.winSpeed = winSpeed;
    }


    //    private Integer stationId;
//    private Double latitude;
//    private Double longitude;
//    private Double height;
//    private Integer type;
//    private Integer hour;
//    private Double dryTemper;
//    private Integer relativeSolid;
//    private Double SolidContainer;
//    private Double sumRadiation;
//    private Double scatterRadiaton;
//    private Double wetTemper;
//    private Double pointTemper;
//    private Double waterPressure;
//    private Double enthalpy;
//    private Double directRadiation;
//    private Double eastSumRadiation;
//    private Double southSumRadiation;
//    private Double westSumRadiation;
//    private Double northSumRadiation;
//    private Double skyTemper;
//    private Double groundTemper;
//    private Double windSpeed;
//    private Integer windDirection;
//    private Integer pressure;
}
