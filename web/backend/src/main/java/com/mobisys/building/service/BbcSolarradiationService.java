package com.mobisys.building.service;

import com.mobisys.building.entity.BbcSolarradiationInfo;

import java.util.List;

public interface BbcSolarradiationService {
    List<BbcSolarradiationInfo> getBbcSolarradiationById(int stationId);
}
