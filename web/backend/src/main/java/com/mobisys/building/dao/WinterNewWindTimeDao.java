package com.mobisys.building.dao;

import com.mobisys.building.entity.TypWinAirTimeInfo;
import com.mobisys.building.entity.WinterNewWindTimeInfo;

import java.util.List;
public interface WinterNewWindTimeDao {
    /*
     * 获取冬季新风时刻计算室外计算参数
     * */
    List<WinterNewWindTimeInfo>  querywinterNewWindTimeById(int id);
    List<WinterNewWindTimeInfo> querywinterNewWindTimeByIT(int stationId, int paramType);
    boolean insertWinterNewWindTime(WinterNewWindTimeInfo winterNewWindTimeInfo);
    boolean updateWinterNewWindTime(WinterNewWindTimeInfo winterNewWindTimeInfo);

}
