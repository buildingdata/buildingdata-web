package com.mobisys.building.entity;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class TypicalMeteoroLogicalInfo {
    private Integer stationId;
    private Integer month;
    private Integer day;
    private Integer time;
    private Integer pressure;
    private Double dryTemp;
    private Double pointTemper;
    private Integer relativeHumidity;
    private Integer cloudiness;
    private Double sunSumRadiation;
    private Double directRadiation;
    private Double scatterRadiation;
    private Double windSpeed;
    private Double windDirection;

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

    public Integer getPressure() {
        return pressure;
    }

    public void setPressure(Integer pressure) {
        this.pressure = pressure;
    }

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

    public Integer getRelativeHumidity() {
        return relativeHumidity;
    }

    public void setRelativeHumidity(Integer relativeHumidity) {
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

    public Double getWindSpeed() {
        return windSpeed;
    }

    public void setWindSpeed(Double windSpeed) {
        this.windSpeed = windSpeed;
    }

    public Double getWindDirection() {
        return windDirection;
    }

    public void setWindDirection(Double windDirection) {
        this.windDirection = windDirection;
    }
}
