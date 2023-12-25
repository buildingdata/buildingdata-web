package com.mobisys.building.service;

import com.mobisys.building.entity.HeatingAirIndoorCalculationParametersInfo;

import java.util.List;

public interface HeatingAirIndoorCalculationParametersService {
    /**
     *按台站号查找采暖空调建筑热工计算室内计算参数表中的数据
     */
    List<HeatingAirIndoorCalculationParametersInfo> getHeatingAirIndoorCalculationParametersById(int id);

    /**
     *给采暖空调建筑热工计算室内计算参数表中添加数据
     */
    boolean addHeatingAirIndoorCalculationParameters(HeatingAirIndoorCalculationParametersInfo heatingAirIndoorCalculationParametersInfo);
    boolean update_heating_air_indoor_calculation_parameters(HeatingAirIndoorCalculationParametersInfo heatingAirIndoorCalculationParametersInfo);
}
