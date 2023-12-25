package com.mobisys.building.dao;



import com.mobisys.building.entity.OtmccInfo;
import com.mobisys.building.entity.TypWinHeatParamInfo;

import java.util.List;

/**
 * 冬夏季典型设计气象日参数——冬季供暖设计日参数——参数表的Dao层
 */
public interface TypWinHeatParamDao {
    /**
     * 列出冬夏季典型设计气象日参数——冬季供暖设计日参数表中信息
     */
    List<TypWinHeatParamInfo> queryTypWinHeatParam();

    /**
     *按照站台号冬夏季典型设计气象日参数——冬季供暖设计日参数中的数据
     */
   TypWinHeatParamInfo queryTypWinHeatParamById(int id);
    /**
     * 导入Excel表中的数据
     */
    boolean insertTypWinHeatParam(TypWinHeatParamInfo typWinHeatParamInfo);
    boolean updateTypWinHeatParam(TypWinHeatParamInfo typWinHeatParamInfo);
}
