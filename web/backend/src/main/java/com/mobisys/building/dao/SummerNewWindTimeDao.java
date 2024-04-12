package com.mobisys.building.dao;

import com.mobisys.building.entity.SummerNewWindParamInfo;
import com.mobisys.building.entity.SummerNewWindTimeInfo;

import java.util.List;
public interface SummerNewWindTimeDao {
    /*
     * 获取夏季新风时刻计算室外计算参数
     * */
    List<SummerNewWindTimeInfo>  querysummerNewWindTimeById(int id);
    List<SummerNewWindTimeInfo>  querysummerNewWindTimeByIT(int stationId,int paramType);
    boolean insertSummerNewWindTime(SummerNewWindTimeInfo summerNewWindTimeInfo);
    boolean updateSummerNewWindTime(SummerNewWindTimeInfo summerNewWindTimeInfo);
}
