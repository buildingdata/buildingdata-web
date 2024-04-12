package com.mobisys.building.dao;

import com.mobisys.building.entity.localDisconforInfo;

import java.util.List;

public interface localDisconforDao {
    List<localDisconforInfo> query();
    boolean update_t_local_thermal_discomfort(localDisconforInfo localDisconforInfo);
}
