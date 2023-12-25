package com.mobisys.building.entity;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class OcpMulgrpcInfo {
    private Integer stationId;
    private Double temperWinAirCt6Hours;
    private Double temperWinAirCt24Hours;
    private Double temperWinAirCt48Hours;
    private Double temperWinHeatingCt1Days;
    private Double temperWinHeatingCt5Days;
    private Double temperWinHeatingCt10Days;
    private Double temperSumAirCdat1Days;
    private Double temperSumAirCdat5Days;
    private Double temperSumAirCdat10Days;
    private Double temperSumAirCt10HoursDry;
    private Double temperSumAirCt10HoursWet;
    private Double temperSumAirCt50HoursDry;
    private Double temperSumAirCt50HoursWet;
    private Double temperSumAirCt100HoursDry;
    private Double temperSumAirCt100HoursWet;
    private Double moistureSumDehumCah10HoursMoi;
    private Double moistureSumDehumCah10HoursDry;
    private Double moistureSumDehumCah10HoursRela;
    private Double moistureSumDehumCah50HoursMoi;
    private Double moistureSumDehumCah50HoursDry;
   private Double moistureSumDehumCah50HoursRela;
    private Double moistureSumDehumCah100HoursMoi;
    private Double moistureSumDehumCah100HoursDry;
    private Double moistureSumDehumCah100HoursRela;
    private Double moistureWinHumCah10HoursMoi;
    private Double moistureWinHumCah10HoursDry;
    private Double moistureWinHumCah10HoursRela;
    private Double moistureWinHumCah50HoursMoi;
    private Double moistureWinHumCah50HoursDry;
   private Double moistureWinHumCah50HoursRela;
    private Double moistureWinHumCah100HoursMoi;
    private Double moistureWinHumCah100HoursDry;
    private Double moistureWinHumCah100HoursRela;
    private Double enthalpySumFreshCe10HoursEnt;
    private Double enthalpySumFreshCe10HoursDry;
    private Double enthalpySumFreshCe50HoursEnt;
    private Double enthalpySumFreshCe50HoursDry;
    private Double enthalpySumFreshCe100HoursEnt;
    private Double enthalpySumFreshCe100HoursDry;
    private Double enthalpyWinFreshCe10HoursEnt;
    private Double enthalpyWinFreshCe10HoursDry;
    private Double enthalpyWinFreshCe50HoursEnt;
    private Double enthalpyWinFreshCe50HoursDry;
    private Double enthalpyWinFreshCe100HoursEnt;
    private Double enthalpyWinFreshCe100HoursDry;

    public Integer getStationId() {
        return stationId;
    }

    public void setStationId(Integer stationId) {
        this.stationId = stationId;
    }

    public Double getTemperWinAirCt6Hours() {
        return temperWinAirCt6Hours;
    }

    public void setTemperWinAirCt6Hours(Double temperWinAirCt6Hours) {
        this.temperWinAirCt6Hours = temperWinAirCt6Hours;
    }

    public Double getTemperWinAirCt24Hours() {
        return temperWinAirCt24Hours;
    }

    public void setTemperWinAirCt24Hours(Double temperWinAirCt24Hours) {
        this.temperWinAirCt24Hours = temperWinAirCt24Hours;
    }

    public Double getTemperWinAirCt48Hours() {
        return temperWinAirCt48Hours;
    }

    public void setTemperWinAirCt48Hours(Double temperWinAirCt48Hours) {
        this.temperWinAirCt48Hours = temperWinAirCt48Hours;
    }

    public Double getTemperWinHeatingCt1Days() {
        return temperWinHeatingCt1Days;
    }

    public void setTemperWinHeatingCt1Days(Double temperWinHeatingCt1Days) {
        this.temperWinHeatingCt1Days = temperWinHeatingCt1Days;
    }

    public Double getTemperWinHeatingCt5Days() {
        return temperWinHeatingCt5Days;
    }

    public void setTemperWinHeatingCt5Days(Double temperWinHeatingCt5Days) {
        this.temperWinHeatingCt5Days = temperWinHeatingCt5Days;
    }

    public Double getTemperWinHeatingCt10Days() {
        return temperWinHeatingCt10Days;
    }

    public void setTemperWinHeatingCt10Days(Double temperWinHeatingCt10Days) {
        this.temperWinHeatingCt10Days = temperWinHeatingCt10Days;
    }

    public Double getTemperSumAirCdat1Days() {
        return temperSumAirCdat1Days;
    }

    public void setTemperSumAirCdat1Days(Double temperSumAirCdat1Days) {
        this.temperSumAirCdat1Days = temperSumAirCdat1Days;
    }

    public Double getTemperSumAirCdat5Days() {
        return temperSumAirCdat5Days;
    }

    public void setTemperSumAirCdat5Days(Double temperSumAirCdat5Days) {
        this.temperSumAirCdat5Days = temperSumAirCdat5Days;
    }

    public Double getTemperSumAirCdat10Days() {
        return temperSumAirCdat10Days;
    }

    public void setTemperSumAirCdat10Days(Double temperSumAirCdat10Days) {
        this.temperSumAirCdat10Days = temperSumAirCdat10Days;
    }

    public Double getTemperSumAirCt10HoursDry() {
        return temperSumAirCt10HoursDry;
    }

    public void setTemperSumAirCt10HoursDry(Double temperSumAirCt10HoursDry) {
        this.temperSumAirCt10HoursDry = temperSumAirCt10HoursDry;
    }

    public Double getTemperSumAirCt10HoursWet() {
        return temperSumAirCt10HoursWet;
    }

    public void setTemperSumAirCt10HoursWet(Double temperSumAirCt10HoursWet) {
        this.temperSumAirCt10HoursWet = temperSumAirCt10HoursWet;
    }

    public Double getTemperSumAirCt50HoursDry() {
        return temperSumAirCt50HoursDry;
    }

    public void setTemperSumAirCt50HoursDry(Double temperSumAirCt50HoursDry) {
        this.temperSumAirCt50HoursDry = temperSumAirCt50HoursDry;
    }

    public Double getTemperSumAirCt50HoursWet() {
        return temperSumAirCt50HoursWet;
    }

    public void setTemperSumAirCt50HoursWet(Double temperSumAirCt50HoursWet) {
        this.temperSumAirCt50HoursWet = temperSumAirCt50HoursWet;
    }

    public Double getTemperSumAirCt100HoursDry() {
        return temperSumAirCt100HoursDry;
    }

    public void setTemperSumAirCt100HoursDry(Double temperSumAirCt100HoursDry) {
        this.temperSumAirCt100HoursDry = temperSumAirCt100HoursDry;
    }

    public Double getTemperSumAirCt100HoursWet() {
        return temperSumAirCt100HoursWet;
    }

    public void setTemperSumAirCt100HoursWet(Double temperSumAirCt100HoursWet) {
        this.temperSumAirCt100HoursWet = temperSumAirCt100HoursWet;
    }

    public Double getMoistureSumDehumCah10HoursMoi() {
        return moistureSumDehumCah10HoursMoi;
    }

    public void setMoistureSumDehumCah10HoursMoi(Double moistureSumDehumCah10HoursMoi) {
        this.moistureSumDehumCah10HoursMoi = moistureSumDehumCah10HoursMoi;
    }

    public Double getMoistureSumDehumCah10HoursDry() {
        return moistureSumDehumCah10HoursDry;
    }

    public void setMoistureSumDehumCah10HoursDry(Double moistureSumDehumCah10HoursDry) {
        this.moistureSumDehumCah10HoursDry = moistureSumDehumCah10HoursDry;
    }

    public Double getMoistureSumDehumCah50HoursMoi() {
        return moistureSumDehumCah50HoursMoi;
    }

    public void setMoistureSumDehumCah50HoursMoi(Double moistureSumDehumCah50HoursMoi) {
        this.moistureSumDehumCah50HoursMoi = moistureSumDehumCah50HoursMoi;
    }

    public Double getMoistureSumDehumCah50HoursDry() {
        return moistureSumDehumCah50HoursDry;
    }

    public void setMoistureSumDehumCah50HoursDry(Double moistureSumDehumCah50HoursDry) {
        this.moistureSumDehumCah50HoursDry = moistureSumDehumCah50HoursDry;
    }

    public Double getMoistureSumDehumCah100HoursMoi() {
        return moistureSumDehumCah100HoursMoi;
    }

    public void setMoistureSumDehumCah100HoursMoi(Double moistureSumDehumCah100HoursMoi) {
        this.moistureSumDehumCah100HoursMoi = moistureSumDehumCah100HoursMoi;
    }

    public Double getMoistureSumDehumCah100HoursDry() {
        return moistureSumDehumCah100HoursDry;
    }

    public void setMoistureSumDehumCah100HoursDry(Double moistureSumDehumCah100HoursDry) {
        this.moistureSumDehumCah100HoursDry = moistureSumDehumCah100HoursDry;
    }

    public Double getMoistureWinHumCah10HoursMoi() {
        return moistureWinHumCah10HoursMoi;
    }

    public void setMoistureWinHumCah10HoursMoi(Double moistureWinHumCah10HoursMoi) {
        this.moistureWinHumCah10HoursMoi = moistureWinHumCah10HoursMoi;
    }

    public Double getMoistureWinHumCah10HoursDry() {
        return moistureWinHumCah10HoursDry;
    }

    public void setMoistureWinHumCah10HoursDry(Double moistureWinHumCah10HoursDry) {
        this.moistureWinHumCah10HoursDry = moistureWinHumCah10HoursDry;
    }

    public Double getMoistureWinHumCah50HoursMoi() {
        return moistureWinHumCah50HoursMoi;
    }

    public void setMoistureWinHumCah50HoursMoi(Double moistureWinHumCah50HoursMoi) {
        this.moistureWinHumCah50HoursMoi = moistureWinHumCah50HoursMoi;
    }

    public Double getMoistureWinHumCah50HoursDry() {
        return moistureWinHumCah50HoursDry;
    }

    public void setMoistureWinHumCah50HoursDry(Double moistureWinHumCah50HoursDry) {
        this.moistureWinHumCah50HoursDry = moistureWinHumCah50HoursDry;
    }

    public Double getMoistureWinHumCah100HoursMoi() {
        return moistureWinHumCah100HoursMoi;
    }

    public void setMoistureWinHumCah100HoursMoi(Double moistureWinHumCah100HoursMoi) {
        this.moistureWinHumCah100HoursMoi = moistureWinHumCah100HoursMoi;
    }

    public Double getMoistureWinHumCah100HoursDry() {
        return moistureWinHumCah100HoursDry;
    }

    public void setMoistureWinHumCah100HoursDry(Double moistureWinHumCah100HoursDry) {
        this.moistureWinHumCah100HoursDry = moistureWinHumCah100HoursDry;
    }

    public Double getEnthalpySumFreshCe10HoursEnt() {
        return enthalpySumFreshCe10HoursEnt;
    }

    public void setEnthalpySumFreshCe10HoursEnt(Double enthalpySumFreshCe10HoursEnt) {
        this.enthalpySumFreshCe10HoursEnt = enthalpySumFreshCe10HoursEnt;
    }

    public Double getEnthalpySumFreshCe10HoursDry() {
        return enthalpySumFreshCe10HoursDry;
    }

    public void setEnthalpySumFreshCe10HoursDry(Double enthalpySumFreshCe10HoursDry) {
        this.enthalpySumFreshCe10HoursDry = enthalpySumFreshCe10HoursDry;
    }

    public Double getEnthalpySumFreshCe50HoursEnt() {
        return enthalpySumFreshCe50HoursEnt;
    }

    public void setEnthalpySumFreshCe50HoursEnt(Double enthalpySumFreshCe50HoursEnt) {
        this.enthalpySumFreshCe50HoursEnt = enthalpySumFreshCe50HoursEnt;
    }

    public Double getEnthalpySumFreshCe50HoursDry() {
        return enthalpySumFreshCe50HoursDry;
    }

    public void setEnthalpySumFreshCe50HoursDry(Double enthalpySumFreshCe50HoursDry) {
        this.enthalpySumFreshCe50HoursDry = enthalpySumFreshCe50HoursDry;
    }

    public Double getEnthalpySumFreshCe100HoursEnt() {
        return enthalpySumFreshCe100HoursEnt;
    }

    public void setEnthalpySumFreshCe100HoursEnt(Double enthalpySumFreshCe100HoursEnt) {
        this.enthalpySumFreshCe100HoursEnt = enthalpySumFreshCe100HoursEnt;
    }

    public Double getEnthalpySumFreshCe100HoursDry() {
        return enthalpySumFreshCe100HoursDry;
    }

    public void setEnthalpySumFreshCe100HoursDry(Double enthalpySumFreshCe100HoursDry) {
        this.enthalpySumFreshCe100HoursDry = enthalpySumFreshCe100HoursDry;
    }

    public Double getEnthalpyWinFreshCe10HoursEnt() {
        return enthalpyWinFreshCe10HoursEnt;
    }

    public void setEnthalpyWinFreshCe10HoursEnt(Double enthalpyWinFreshCe10HoursEnt) {
        this.enthalpyWinFreshCe10HoursEnt = enthalpyWinFreshCe10HoursEnt;
    }

    public Double getEnthalpyWinFreshCe10HoursDry() {
        return enthalpyWinFreshCe10HoursDry;
    }

    public void setEnthalpyWinFreshCe10HoursDry(Double enthalpyWinFreshCe10HoursDry) {
        this.enthalpyWinFreshCe10HoursDry = enthalpyWinFreshCe10HoursDry;
    }

    public Double getEnthalpyWinFreshCe50HoursEnt() {
        return enthalpyWinFreshCe50HoursEnt;
    }

    public void setEnthalpyWinFreshCe50HoursEnt(Double enthalpyWinFreshCe50HoursEnt) {
        this.enthalpyWinFreshCe50HoursEnt = enthalpyWinFreshCe50HoursEnt;
    }

    public Double getEnthalpyWinFreshCe50HoursDry() {
        return enthalpyWinFreshCe50HoursDry;
    }

    public void setEnthalpyWinFreshCe50HoursDry(Double enthalpyWinFreshCe50HoursDry) {
        this.enthalpyWinFreshCe50HoursDry = enthalpyWinFreshCe50HoursDry;
    }

    public Double getEnthalpyWinFreshCe100HoursEnt() {
        return enthalpyWinFreshCe100HoursEnt;
    }

    public void setEnthalpyWinFreshCe100HoursEnt(Double enthalpyWinFreshCe100HoursEnt) {
        this.enthalpyWinFreshCe100HoursEnt = enthalpyWinFreshCe100HoursEnt;
    }

    public Double getEnthalpyWinFreshCe100HoursDry() {
        return enthalpyWinFreshCe100HoursDry;
    }

    public void setEnthalpyWinFreshCe100HoursDry(Double enthalpyWinFreshCe100HoursDry) {
        this.enthalpyWinFreshCe100HoursDry = enthalpyWinFreshCe100HoursDry;
    }
}
