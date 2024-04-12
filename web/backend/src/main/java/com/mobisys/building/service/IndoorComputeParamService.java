package com.mobisys.building.service;

import com.mobisys.building.entity.IndoorComputeParamInfo;

import java.util.List;

public interface IndoorComputeParamService {

    List<IndoorComputeParamInfo> getIndoorComputeParamById(int stationId);
    boolean update_icap(IndoorComputeParamInfo indoorComputeParamInfo);
}
