package com.mobisys.building.dao;

import com.mobisys.building.entity.TypWinHeatParamInfo;
import com.mobisys.building.entity.TypWinHeatTimeInfo;

import java.util.List;

/**
 * 冬夏季典型设计气象日参数——冬季供暖设计日参数——时刻表的Dao层
 */
public interface TypWinHeatTimeDao {
    /**
     * 列出冬夏季典型设计气象日参数——冬季供暖设计日参数表中信息
     */
    List<TypWinHeatTimeInfo> queryTypWinHeatTime();

    /**
     *按照站台号冬夏季典型设计气象日参数——冬季供暖设计日参数中的数据
     */
    List<TypWinHeatTimeInfo> queryTypWinHeatTimeById(int id);
    List<TypWinHeatTimeInfo> queryTypWinHeatTimeByIT(int stationId,int paramType);
    /**
     * 导入Excel表格--24个时刻数据
     */
    boolean insertTypWinHeatTime(TypWinHeatTimeInfo typWinHeatTimeInfo);
    boolean updateTypWinHeatTime(TypWinHeatTimeInfo typWinHeatTimeInfo);
}
