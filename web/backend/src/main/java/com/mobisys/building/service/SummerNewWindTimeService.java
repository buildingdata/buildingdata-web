package com.mobisys.building.service;

import com.mobisys.building.entity.SummerNewWindParamInfo;
import com.mobisys.building.entity.SummerNewWindTimeInfo;

import java.util.List;

public interface SummerNewWindTimeService {
    /*
    * 根据台站号获取夏季新风时刻室外计算参数
    * */
    List<SummerNewWindTimeInfo> getSummerNewWindTimeById(int id);
    List<SummerNewWindTimeInfo> getSummerNewWindTimeByIT(int id,int type);
    boolean addSummerNewWindTime(SummerNewWindTimeInfo summerNewWindTimeInfo);
    boolean updateSummerNewWindTime(SummerNewWindTimeInfo summerNewWindTimeInfo);
}
