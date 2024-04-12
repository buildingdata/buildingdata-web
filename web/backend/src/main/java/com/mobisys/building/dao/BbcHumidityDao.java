package com.mobisys.building.dao;

import com.mobisys.building.entity.BbcHumidityInfo;

import java.util.List;

public interface BbcHumidityDao {
    List<BbcHumidityInfo> queryBbcHumidityById(int stationId);
}
