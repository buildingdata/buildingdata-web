package com.mobisys.building.service;

import com.mobisys.building.entity.OcpWaHumInfo;
import com.mobisys.building.entity.OcpedidInfo;

import java.util.List;

public interface OcpWahumService {
   List<OcpWaHumInfo> queryWaHumById(Integer staionId);
   boolean addOcpWaHum(OcpWaHumInfo ocpWaHumInfo);
   boolean updateOcpWaHum(OcpWaHumInfo ocpWaHumInfo);
}
