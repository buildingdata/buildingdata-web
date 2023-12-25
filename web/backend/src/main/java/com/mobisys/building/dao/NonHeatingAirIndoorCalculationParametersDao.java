package com.mobisys.building.dao;

import com.mobisys.building.entity.NonHeatingAirIndoorCalculationParametersInfo;

import java.util.List;

public interface NonHeatingAirIndoorCalculationParametersDao {
    /**
     * 按台站号查询非采暖空调建筑室内计算参数表中的数据
     */
    List<NonHeatingAirIndoorCalculationParametersInfo> queryNonHeatingAirIndoorCalculationParametersById(int id);

    /**
     * 向非采暖空调建筑室内计算参数表中插入新数据
     */
    boolean insertNonHeatingAirIndoorCalculationParameters(NonHeatingAirIndoorCalculationParametersInfo nonHeatingAirIndoorCalculationParametersInfo);


    boolean update_non_heating_air_indoor_calculation_parameters(NonHeatingAirIndoorCalculationParametersInfo nonHeatingAirIndoorCalculationParametersInfo);
}
