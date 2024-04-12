package com.mobisys.building.dao;

import com.mobisys.building.entity.TypWinAirParamInfo;
import com.mobisys.building.entity.TypWinAirTimeInfo;

import java.util.List;
/**
 * 冬夏季典型设计气象日参数——冬季空调室外计算参数——参数表的Dao层
 */
public interface TypWinAirParamDao {
    /**
     * 列出冬夏季典型设计气象日参数——冬季空调室外计算参数表中信息
     */
    List<TypWinAirParamInfo> queryTypWinAirParam();

    /**
     *按照站台号冬夏季典型设计气象日参数——冬季空调室外计算参数中的数据
     */
    TypWinAirParamInfo queryTypWinAirParamById(int id);

    /**
     * 导入Excel数据表格--对应冬季空调参数表
     */
    boolean insertTypWinAirParam(TypWinAirParamInfo typWinAirParamInfo);
    boolean updateTypWinAirParam(TypWinAirParamInfo typWinAirParamInfo);
}
