package com.mobisys.building.dao;

import com.mobisys.building.entity.PassiveSolarBuildingDesignParametersInfo;

import java.util.List;

public interface PassiveSolarBuildingDesignParametersDao {
    /**
     * 按台站号查询被动式太阳能建筑设计参数表中的数据
     */
    List<PassiveSolarBuildingDesignParametersInfo> queryPassiveSolarBuildingDesignParametersById(int id);

    /**
     * 向被动式太阳能建筑设计参数表中插入新数据
     */
    boolean insertPassiveSolarBuildingDesignParameters(PassiveSolarBuildingDesignParametersInfo passiveSolarBuildingDesignParametersInfo);

    boolean update_passive_solar_building_design_parameters(PassiveSolarBuildingDesignParametersInfo passiveSolarBuildingDesignParametersInfo);

}
