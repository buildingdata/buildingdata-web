package com.mobisys.building.dao;

import com.mobisys.building.entity.StationInfo;
import com.mobisys.building.entity.TemperatureInfo;

import java.util.List;

public interface TemperatureDao {

    List<StationInfo> queryTemperatureList();
    /*
    * 按照台站Id查找建筑气候设计中的温度
    * */
    List<TemperatureInfo> queryTemperatureById(int id);
}
