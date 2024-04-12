package com.mobisys.building.service;


import com.mobisys.building.entity.OtmccInfo;
import com.mobisys.building.entity.TypWinHeatTimeInfo;

import java.util.List;

public interface TypWinHeatTimeService {
    /**
     * 进行对冬夏季典型设计气象日参数——冬季供暖设计日参数——时刻表的查询操作
     */
    List<TypWinHeatTimeInfo> getTypWinHeatTimeList();

    /**
     * 进行按照站台号进行查询冬夏季典型设计气象日参数——冬季供暖设计日参数——时刻表的数据的操作
     */
    List<TypWinHeatTimeInfo> getTypWinHeatTimeById(int id);
    List<TypWinHeatTimeInfo> getTypWinHeatTimeByIT(int id,int type);
    /**
     * 导入Excel表格--冬季供暖24时刻数据
     */
    boolean addTypWinHeatTime(TypWinHeatTimeInfo typWinHeatTimeInfo);
    boolean updateTypWinHeatTime(TypWinHeatTimeInfo typWinHeatTimeInfo);
}
