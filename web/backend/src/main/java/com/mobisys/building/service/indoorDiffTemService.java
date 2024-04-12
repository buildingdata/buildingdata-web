package com.mobisys.building.service;

import com.mobisys.building.entity.indoorDiffTemInfo;

import java.util.List;

public interface indoorDiffTemService {
    public List<indoorDiffTemInfo> getDiffTem();
    public boolean update_t_indoor_different_climate(indoorDiffTemInfo indoorDiffTemInfo);
}
