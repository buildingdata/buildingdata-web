package com.mobisys.building.service;

import com.mobisys.building.entity.BbcHumidityInfo;


import java.util.List;

public interface BbcHumidityService {
    public List<BbcHumidityInfo> getBbcHumidityById(int stationId);
}
