package com.mobisys.building.service;

import com.mobisys.building.entity.TypWinHeatParamInfo;
import com.mobisys.building.entity.TypWinHeatTimeInfo;

import java.util.List;

public interface TypWinHeatParamService {
    /**
     * 进行对冬夏季典型设计气象日参数——冬季供暖设计日参数——参数表的查询操作
     */
    List<TypWinHeatParamInfo> getTypWinHeatParamList();

    /**
     * 进行按照站台号进行查询冬夏季典型设计气象日参数——冬季供暖设计日参数——参数表的数据的操作
     */
    TypWinHeatParamInfo getTypWinHeatParamById(int id);
    /**
     * 导入Excel表格中的数据--冬季供暖室外计算参数表
     */
    boolean addTypWinHeatParam(TypWinHeatParamInfo typWinHeatParamInfo);
    boolean updateTypWinHeatParam(TypWinHeatParamInfo typWinHeatParamInfo);
}
