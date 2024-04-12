package com.mobisys.building.dao;

import com.mobisys.building.entity.OcpedidInfo;
import com.mobisys.building.entity.OtmccInfo;

import java.util.List;

public interface OtmccDao {
    /**
     * 列出围护结构热湿耦合计算室外计算参数信息
     */
    List<OtmccInfo> queryOtmcc();

    /**
     * 按城市ID查找围护结构热湿耦合计算室外计算参数信息
     */
    List<OtmccInfo> queryOtmccById(int id);
    List<OtmccInfo> queryOtmccByIT(int stationId, int time);

    boolean insertOtmcc(OtmccInfo otmccInfo);
    boolean updateOtmcc(OtmccInfo otmccInfo);
}
