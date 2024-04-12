package com.mobisys.building.service;

import com.mobisys.building.entity.NonHeatingAirIndoorCalculationParametersInfo;

import java.util.List;

public interface NonHeatingAirIndoorCalculationParametersService {
    /**
     * 按台站号查询非采暖空调建筑室内计算参数表中数据
     */
    List<NonHeatingAirIndoorCalculationParametersInfo> getNonHeatingAirIndoorCalculationParametersById(int id);

    /**
     * 向非采暖空调建筑室内计算参数表插入新数据
     */
    boolean addNonHeatingAirIndoorCalculationParameters(NonHeatingAirIndoorCalculationParametersInfo nonHeatingAirIndoorCalculationParametersInfo);


    boolean update_non_heating_air_indoor_calculation_parameters(NonHeatingAirIndoorCalculationParametersInfo nonHeatingAirIndoorCalculationParametersInfo);


}
