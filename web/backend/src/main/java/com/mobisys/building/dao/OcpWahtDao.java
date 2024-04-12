package com.mobisys.building.dao;

import com.mobisys.building.entity.OcpWaHumInfo;
import com.mobisys.building.entity.OcpWahtInfo;


import java.util.List;

public interface OcpWahtDao {
    /**
     *通过站台号查询冬季加湿时刻表中的信息
     */
    List<OcpWahtInfo> queryWahtById(int stationId);
    List<OcpWahtInfo> queryWahtByIT(int stationId, int paramType);
    boolean insertOcpWaht(OcpWahtInfo ocpWahtInfo);

    boolean updateOcpWaht(OcpWahtInfo ocpWahtInfo);
}
