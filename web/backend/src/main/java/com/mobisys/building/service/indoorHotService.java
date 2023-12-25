package com.mobisys.building.service;

import com.mobisys.building.entity.OcpnvdInfo;
import com.mobisys.building.entity.indoorHotInfo;

import java.util.List;

public interface indoorHotService {
    List<indoorHotInfo> getHot();
    boolean update_t_indoor_thermal_classification(indoorHotInfo indoorHotInfo);

}
