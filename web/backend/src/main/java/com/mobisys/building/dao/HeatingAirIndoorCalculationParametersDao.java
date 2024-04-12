package com.mobisys.building.dao;

import com.mobisys.building.entity.HeatingAirIndoorCalculationParametersInfo;

import java.util.List;


public interface HeatingAirIndoorCalculationParametersDao {
    /**
     * 按照台站号查询采暖空调建筑热工计算室内计算参数中的数据
     * @param id
     * @return
     */
    List<HeatingAirIndoorCalculationParametersInfo> queryHeatingAirIndoorCalculationParametersById(int id);

    /**
     * 添加采暖空调建筑热工计算室内计算参数表中的数据
     */
    boolean insertHeatingAirIndoorCalculationParameters(HeatingAirIndoorCalculationParametersInfo heatingAirIndoorCalculationParametersInfo);

    boolean update_heating_air_indoor_calculation_parameters(HeatingAirIndoorCalculationParametersInfo heatingAirIndoorCalculationParametersInfo);
}
