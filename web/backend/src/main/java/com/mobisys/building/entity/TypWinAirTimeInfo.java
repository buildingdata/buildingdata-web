package com.mobisys.building.entity;

import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
/**
 * 冬夏季典型设计气象日参数——冬季空调室外计算参数——时刻表实体类
 */
public class TypWinAirTimeInfo {
    private Integer stationId;
    /**
     * 参数类型，
     * 1：逐时变化系数。
     * 2：累年平均每天不保证1天列，但不包含日较差。
     * 3：累年平均每天不保证5天列，但不包含日较差。
     * 4：累年平均每天不保证10天列，但不包含日较差。
     */
    private Integer paramType;
    private Double t1;
    private Double t2;
    private Double t3;
    private Double t4;
    private Double t5;
    private Double t6;
    private Double t7;
    private Double t8;
    private Double t9;
    private Double t10;
    private Double t11;
    private Double t12;
    private Double t13;
    private Double t14;
    private Double t15;
    private Double t16;
    private Double t17;
    private Double t18;
    private Double t19;
    private Double t20;
    private Double t21;
    private Double t22;
    private Double t23;
    private Double t24;

    public Integer getStationId() {
        return stationId;
    }

    public void setStationId(Integer stationId) {
        this.stationId = stationId;
    }

    public Integer getParamType() {
        return paramType;
    }

    public void setParamType(Integer paramType) {
        this.paramType = paramType;
    }

    public Double getT1() {
        return t1;
    }

    public void setT1(Double t1) {
        this.t1 = t1;
    }

    public Double getT2() {
        return t2;
    }

    public void setT2(Double t2) {
        this.t2 = t2;
    }

    public Double getT3() {
        return t3;
    }

    public void setT3(Double t3) {
        this.t3 = t3;
    }

    public Double getT4() {
        return t4;
    }

    public void setT4(Double t4) {
        this.t4 = t4;
    }

    public Double getT5() {
        return t5;
    }

    public void setT5(Double t5) {
        this.t5 = t5;
    }

    public Double getT6() {
        return t6;
    }

    public void setT6(Double t6) {
        this.t6 = t6;
    }

    public Double getT7() {
        return t7;
    }

    public void setT7(Double t7) {
        this.t7 = t7;
    }

    public Double getT8() {
        return t8;
    }

    public void setT8(Double t8) {
        this.t8 = t8;
    }

    public Double getT9() {
        return t9;
    }

    public void setT9(Double t9) {
        this.t9 = t9;
    }

    public Double getT10() {
        return t10;
    }

    public void setT10(Double t10) {
        this.t10 = t10;
    }

    public Double getT11() {
        return t11;
    }

    public void setT11(Double t11) {
        this.t11 = t11;
    }

    public Double getT12() {
        return t12;
    }

    public void setT12(Double t12) {
        this.t12 = t12;
    }

    public Double getT13() {
        return t13;
    }

    public void setT13(Double t13) {
        this.t13 = t13;
    }

    public Double getT14() {
        return t14;
    }

    public void setT14(Double t14) {
        this.t14 = t14;
    }

    public Double getT15() {
        return t15;
    }

    public void setT15(Double t15) {
        this.t15 = t15;
    }

    public Double getT16() {
        return t16;
    }

    public void setT16(Double t16) {
        this.t16 = t16;
    }

    public Double getT17() {
        return t17;
    }

    public void setT17(Double t17) {
        this.t17 = t17;
    }

    public Double getT18() {
        return t18;
    }

    public void setT18(Double t18) {
        this.t18 = t18;
    }

    public Double getT19() {
        return t19;
    }

    public void setT19(Double t19) {
        this.t19 = t19;
    }

    public Double getT20() {
        return t20;
    }

    public void setT20(Double t20) {
        this.t20 = t20;
    }

    public Double getT21() {
        return t21;
    }

    public void setT21(Double t21) {
        this.t21 = t21;
    }

    public Double getT22() {
        return t22;
    }

    public void setT22(Double t22) {
        this.t22 = t22;
    }

    public Double getT23() {
        return t23;
    }

    public void setT23(Double t23) {
        this.t23 = t23;
    }

    public Double getT24() {
        return t24;
    }

    public void setT24(Double t24) {
        this.t24 = t24;
    }
}
