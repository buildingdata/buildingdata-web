package com.mobisys.building.dao;

import com.mobisys.building.entity.OcpWaHumInfo;
import com.mobisys.building.entity.OcpnvdInfo;

import java.util.List;

public interface OcpWahumDao {
    /**
     * 通过站台号查询冬季加湿参数表中的信息
     */
    List<OcpWaHumInfo> queryWaHumById(int stationId);
    boolean insertOcpWaHum(OcpWaHumInfo ocpWaHumInfo);

    boolean updateOcpWaHum(OcpWaHumInfo ocpWaHumInfo);
}
