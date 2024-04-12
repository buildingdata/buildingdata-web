package com.mobisys.building.service;


import com.mobisys.building.entity.OcpedidInfo;
import com.mobisys.building.entity.OcpehhccInfo;
import org.apache.ibatis.annotations.Param;

import java.util.List;

public interface OcpehhccService {
    List<OcpehhccInfo> getOcpehhccList();

    List<OcpehhccInfo> getOcpehhccById(int id);
    List<OcpehhccInfo> getOcpehhccByIT(int stationId,int month,int day,int time);

    boolean addOcpehhcc(OcpehhccInfo ocpehhccInfo);
    boolean updateOcpehhcc(OcpehhccInfo ocpehhccInfo);
//    一次插入多条数据
    boolean addOcpehhccList(@Param("ocpehhccInfoList")List<OcpehhccInfo> ocpehhccInfoList);
}
