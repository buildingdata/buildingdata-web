package com.mobisys.building.service;

import com.mobisys.building.entity.TemperatureInfo;
import java.util.List;

public interface TemperatureService {
    //List<TemperatureInfo> getTemperatureList();
    List<TemperatureInfo> getTemperatureById(int id);
}
