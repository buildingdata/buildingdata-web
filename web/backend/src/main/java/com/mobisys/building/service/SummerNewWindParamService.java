package com.mobisys.building.service;

import com.mobisys.building.entity.SummerNewWindParamInfo;
import com.mobisys.building.entity.TypicalSummerAirconditionerParamInfo;

import java.util.List;

public interface SummerNewWindParamService {
    /*
    * 根据台站号获取夏季新风参数
    * */
    List<SummerNewWindParamInfo> getSummerNewWindParamById(int id);
    boolean addSummerNewWindParam(SummerNewWindParamInfo summerNewWindParamInfo);
    boolean updateSummerNewWindParam(SummerNewWindParamInfo summerNewWindParamInfo);
}
