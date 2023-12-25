package com.mobisys.building.service;

import com.mobisys.building.entity.TypWinAirTimeInfo;
import com.mobisys.building.entity.TypWinHeatParamInfo;

import java.util.List;

public interface TypWinAirTimeService {
    /**
     * 进行对冬夏季典型设计气象日参数——冬季空调室外计算参数——时刻表的查询操作
     */
    List<TypWinAirTimeInfo> getTypWinAirTimeList();

    /**
     * 进行按照站台号进行查询冬夏季典型设计气象日参数——冬季空调室外计算参数——时刻表的数据的操作
     */
    List<TypWinAirTimeInfo> getTypWinAirTimeById(int id);
    List<TypWinAirTimeInfo> getTypWinAirTimeByIT(int id,int type);
    /**
    * 导入Excel数据表--对应冬季空调24时刻的数据
    */
    boolean addTypWinAirTime(TypWinAirTimeInfo typWinAirTimeInfo);
    boolean updateTypWinAirTime(TypWinAirTimeInfo typWinAirTimeInfo);
}
