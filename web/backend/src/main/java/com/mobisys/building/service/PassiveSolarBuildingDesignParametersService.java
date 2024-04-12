package com.mobisys.building.service;

import com.mobisys.building.entity.PassiveSolarBuildingDesignParametersInfo;

import java.util.List;

public interface PassiveSolarBuildingDesignParametersService {
    /**
     * 按台站号查询被动式太阳能建筑设计参数表中数据
     */
    List<PassiveSolarBuildingDesignParametersInfo> getPassiveSolarBuildingDesignParametersById(int id);

    /**
     * 向被动式太阳能建筑设计参数表插入新数据
     */
    boolean addPassiveSolarBuildingDesignParameters(PassiveSolarBuildingDesignParametersInfo passiveSolarBuildingDesignParametersInfo);


    boolean update_passive_solar_building_design_parameters(PassiveSolarBuildingDesignParametersInfo passiveSolarBuildingDesignParametersInfo);
}
