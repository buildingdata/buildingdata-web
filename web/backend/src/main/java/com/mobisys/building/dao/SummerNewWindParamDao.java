package com.mobisys.building.dao;

import com.mobisys.building.entity.SummerNewWindParamInfo;
import com.mobisys.building.entity.TypicalSummerAirconditionerParamInfo;

import java.util.List;
public interface SummerNewWindParamDao {
    /*
    * 获取夏季新风计算室外计算参数
    * */
    List<SummerNewWindParamInfo>  querysummerNewWindParamById(int id);
    boolean insertSummerNewWindParam(SummerNewWindParamInfo summerNewWindParamInfo);
    boolean updateSummerNewWindParam(SummerNewWindParamInfo summerNewWindParamInfo);
}
