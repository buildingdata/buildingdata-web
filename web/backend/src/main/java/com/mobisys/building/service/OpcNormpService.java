package com.mobisys.building.service;

import com.mobisys.building.entity.OpcNormpInfo;

import java.util.List;

public interface OpcNormpService {
    public List<OpcNormpInfo> queryNormParamById(int stationId);
}
