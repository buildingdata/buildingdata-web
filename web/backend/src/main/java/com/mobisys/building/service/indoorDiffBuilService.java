package com.mobisys.building.service;

import com.mobisys.building.entity.indoorDiffBuilInfo;

import java.util.List;

public interface indoorDiffBuilService {
    public List<indoorDiffBuilInfo> getDiffBuil(String type);
    public List<String> getType();
    public boolean update_t_diffrent_build_temper(indoorDiffBuilInfo indoorDiffBuilInfo);
}
