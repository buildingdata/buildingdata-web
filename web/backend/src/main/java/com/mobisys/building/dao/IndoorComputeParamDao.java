package com.mobisys.building.dao;

import com.mobisys.building.entity.IndoorComputeParamInfo;

import java.util.List;


public interface IndoorComputeParamDao {


    /**
     * 按小时计算或建筑动态模拟
     */
    List<IndoorComputeParamInfo> queryIndoorComputeParamById(int stationId);

    boolean update_icap(IndoorComputeParamInfo indoorComputeParamInfo);
}


