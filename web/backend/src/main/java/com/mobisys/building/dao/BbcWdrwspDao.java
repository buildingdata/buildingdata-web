package com.mobisys.building.dao;

import com.mobisys.building.entity.BbcWdrwspInfo;

import java.util.List;

public interface BbcWdrwspDao {
    /**
     * 根据站点ID查询出该站点的风速信息
     * @param stationId
     * @return
     */
    List<BbcWdrwspInfo> queryBbcWdrwspById(int stationId);
}
