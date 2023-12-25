package com.mobisys.building.service;

import com.mobisys.building.entity.localDisconforInfo;

import java.util.List;

public interface localDisconforService {
    List<localDisconforInfo> getLocal();
    boolean update_t_local_thermal_discomfort(localDisconforInfo localDisconforInfo);
}
