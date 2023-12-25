package com.mobisys.building.entity;


import lombok.Getter;
import lombok.Setter;

import java.util.Date;

//@Getter
//@Setter
public class TdocbInfo {
    //    新数据
    private Integer stationId;   //台站号
    private Integer HDD;   //采暖度日数HDD
    private Integer CDD;   //空调度日数CDD
    private Double tMinDMT;   //累年最低日平均温度
    private Double tMaxDMT;   //累年最高日平均温度
    private Double tHCalDMT;  //隔热计算日平均温度
    private Double tW;      //采暖室外计算温度
    private Double tMinMMT;   //最冷月平均温度
    private Double tMaxMMT;   //最热月平均温度
    private Date StartHeating; //采暖期开始
    private Date EndHeating; //采暖期结束
    private Double HeatingMT;//采暖期平均温度
    private Integer zD;      //采暖期天数
//    private Integer hDpass;  //采暖期度日数
    private Double wEAve;   //计算采暖期室外平均相对湿度e(%)

    public Integer getStationId() {
        return stationId;
    }

    public void setStationId(Integer stationId) {
        this.stationId = stationId;
    }

    public Integer getHDD() {
        return HDD;
    }

    public void setHDD(Integer HDD) {
        this.HDD = HDD;
    }

    public Integer getCDD() {
        return CDD;
    }

    public void setCDD(Integer CDD) {
        this.CDD = CDD;
    }

    public Double gettMinDMT() {
        return tMinDMT;
    }

    public void settMinDMT(Double tMinDMT) {
        this.tMinDMT = tMinDMT;
    }

    public Double gettMaxDMT() {
        return tMaxDMT;
    }

    public void settMaxDMT(Double tMaxDMT) {
        this.tMaxDMT = tMaxDMT;
    }

    public Double gettHCalDMT() {
        return tHCalDMT;
    }

    public void settHCalDMT(Double tHCalDMT) {
        this.tHCalDMT = tHCalDMT;
    }

    public Double gettW() {
        return tW;
    }

    public void settW(Double tW) {
        this.tW = tW;
    }

    public Double gettMinMMT() {
        return tMinMMT;
    }

    public void settMinMMT(Double tMinMMT) {
        this.tMinMMT = tMinMMT;
    }

    public Double gettMaxMMT() {
        return tMaxMMT;
    }

    public void settMaxMMT(Double tMaxMMT) {
        this.tMaxMMT = tMaxMMT;
    }

    public Date getStartHeating() {
        return StartHeating;
    }

    public void setStartHeating(Date startHeating) {
        StartHeating = startHeating;
    }

    public Date getEndHeating() {
        return EndHeating;
    }

    public void setEndHeating(Date endHeating) {
        EndHeating = endHeating;
    }

    public Double getHeatingMT() {
        return HeatingMT;
    }

    public void setHeatingMT(Double heatingMT) {
        HeatingMT = heatingMT;
    }

    public Integer getzD() {
        return zD;
    }

    public void setzD(Integer zD) {
        this.zD = zD;
    }

    public Double getwEAve() {
        return wEAve;
    }

    public void setwEAve(Double wEAve) {
        this.wEAve = wEAve;
    }

    //    旧数据
//    private Integer stationId;
//    private Double tMinMT;
//    private Double tMaxMT;
//    private Integer HDD;
//    private Integer CDD;
//    private Double tW;
//    private Double tEMin;
//    private Integer zD;
//    private Double tEAve;
//    private Double wEAve;
//    private Integer cld;
//    private Integer rsdH;
//    private Integer rsdWinter;
//    private Double tEd;
//    private Double tEy;
//    private Double pre;

    public TdocbInfo() {
    }
}
