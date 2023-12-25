package com.mobisys.building.dao;

import com.mobisys.building.entity.TypWinAirParamInfo;
import com.mobisys.building.entity.WinterNewWindParamInfo;

import java.util.List;
public interface WinterNewWindParamDao {
    /*
     * 获取冬季新风计算室外计算参数
     * */
    List<WinterNewWindParamInfo>  querywinterNewWindParamById(int id);
    boolean insertWinterNewWindParam(WinterNewWindParamInfo winterNewWindParamInfo);
    boolean updateWinterNewWindParam(WinterNewWindParamInfo winterNewWindParamInfo);
}
