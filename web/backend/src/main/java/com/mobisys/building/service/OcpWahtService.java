package com.mobisys.building.service;

import com.mobisys.building.entity.OcpWaHumInfo;
import com.mobisys.building.entity.OcpWahtInfo;

import java.util.List;

public interface OcpWahtService {
    public List<OcpWahtInfo> queryWahtById(Integer stationId);
    public List<OcpWahtInfo> queryWahtByIT(Integer stationId,int type);
    boolean addOcpWaht(OcpWahtInfo ocpWahtInfo);
    boolean updateOcpWaht(OcpWahtInfo ocpWahtInfo);
}
