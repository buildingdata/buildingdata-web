package com.mobisys.building.service;

import com.mobisys.building.entity.TypWinAirParamInfo;
import com.mobisys.building.entity.TypWinAirTimeInfo;

import java.util.List;

public interface TypWinAirParamService {
    /**
     * 进行对冬夏季典型设计气象日参数——冬季空调室外计算参数——参数表的查询操作
     */
    List<TypWinAirParamInfo> getTypWinAirParamList(int id);

    /**
     * 进行按照站台号进行查询冬夏季典型设计气象日参数——冬季空调室外计算参数——参数表的数据的操作
     */
    TypWinAirParamInfo getTypWinAirParamById(int id);

    /**
     * 插入Excel表格--对应冬季空调参数表
     */
    boolean addTypWinAirParam(TypWinAirParamInfo typWinAirParamInfo);
    boolean updateTypWinAirParam(TypWinAirParamInfo typWinAirParamInfo);
}
