package com.mobisys.building.dao;

import com.mobisys.building.entity.BbcSolarradiationInfo;

import java.util.List;

public interface BbcSolarradiationDao {
    List<BbcSolarradiationInfo> queryBbcSolarradiationById(int stationId);
}
