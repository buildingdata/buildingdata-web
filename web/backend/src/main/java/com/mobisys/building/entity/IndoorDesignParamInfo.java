package com.mobisys.building.entity;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.Getter;
import lombok.Setter;

/**
 * 暖通空调室内设计参数
 * 对应数据库表iddp
 */
@JsonIgnoreProperties(value = {"hibernateLazyInitializer", "handler"})
@Getter
@Setter
public class IndoorDesignParamInfo {

    private String climates;
    private String season;
    private String archType;
    private String archLevel;
    private String tempRange;
    private String humiRange;
    private String windSpeed;

}
