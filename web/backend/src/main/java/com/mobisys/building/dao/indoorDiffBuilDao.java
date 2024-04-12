package com.mobisys.building.dao;

import com.mobisys.building.entity.indoorDiffBuilInfo;

import java.util.List;

public interface indoorDiffBuilDao {
     List<indoorDiffBuilInfo> queryByBuild(String build);
     List<String> getType();
     boolean update_t_diffrent_build_temper(indoorDiffBuilInfo indoorDiffBuilInfo);
}
