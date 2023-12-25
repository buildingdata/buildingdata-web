package com.mobisys.building.dao;

import com.mobisys.building.entity.TypWinAirTimeInfo;

import java.util.List;

/**
 * 冬夏季典型设计气象日参数——冬季空调室外计算参数——时刻表的Dao层
 */
public interface TypWinAirTimeDao {
    /**
     * 列出冬夏季典型设计气象日参数——冬季空调室外计算参数表中信息
     */
    List<TypWinAirTimeInfo> queryTypWinAirTime();

    /**
     *按照站台号冬夏季典型设计气象日参数——冬季空调室外计算参数中的数据
     */
    List<TypWinAirTimeInfo> queryTypWinAirTimeById(int id);
    List<TypWinAirTimeInfo> queryTypWinAirTimeByIT(int stationId,int paramType);
    /**
     * 导入Excel数据表--对应冬季空调24时刻的数据
     */
    boolean insertTypWinAirTime(TypWinAirTimeInfo typWinAirTimeInfo);
    boolean updateTypWinAirTime(TypWinAirTimeInfo typWinAirTimeInfo);
}
