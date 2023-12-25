package com.mobisys.building.dao;

import com.mobisys.building.entity.OpcNormpInfo;

import java.util.List;

public interface OpcNormpDao {
    List<OpcNormpInfo> queryById(int stationId);
}
