package com.mobisys.building.dao;

import com.mobisys.building.entity.indoorDiffTemInfo;

import java.util.List;

public interface indoorDiffTemDao {
    List<indoorDiffTemInfo> query();
    boolean update_t_indoor_different_climate(indoorDiffTemInfo indoorDiffTemInfo);
}
