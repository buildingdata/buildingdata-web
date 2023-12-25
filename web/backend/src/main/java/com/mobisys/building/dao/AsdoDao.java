package com.mobisys.building.dao;

import com.mobisys.building.entity.AsdoInfo;
import com.mobisys.building.entity.OcpedidInfo;

import java.util.List;

public interface AsdoDao {
    /**
     * 列出建筑遮阳设计室外计算参数表中信息
     */
    List<AsdoInfo> queryAsdo();

    /**
     * 按城市ID查找建筑遮阳设计室外计算参数信息
     */
    List<AsdoInfo> queryAsdoById(int id);
    List<AsdoInfo> queryAsdoByIT(int stationId,int time,int table_Type);

    /**
     * 插入遮阳计算时段起始日设计计算参数
     */
    boolean insertAsdoFromTable_1(AsdoInfo asdoInfo);
    boolean updateAsdoFromTable_1(AsdoInfo asdoInfo);

    /**
     * 插入遮阳计算时段终止日设计计算参数
     */
    boolean insertAsdoFromTable_2(AsdoInfo asdoInfo);
    boolean updateAsdoFromTable_2(AsdoInfo asdoInfo);

    /**
     * 插入遮阳计算时段内的设计计算参数
     */

    boolean insertAsdoFromTable_3(AsdoInfo asdoInfo);
    boolean updateAsdoFromTable_3(AsdoInfo asdoInfo);
}
