package com.mobisys.building.service;

import com.mobisys.building.entity.SummerNewWindParamInfo;
import com.mobisys.building.entity.WinterNewWindParamInfo;

import java.util.List;
public interface WinterNewWindParamService {
    /*
     * 根据台站号获取夏季新风参数
     * */
    List<WinterNewWindParamInfo> getWinterNewWindParamById(int id);
    boolean addWinterNewWindParam(WinterNewWindParamInfo winterNewWindParamInfo);
    boolean updateWinterNewWindParam(WinterNewWindParamInfo winterNewWindParamInfo);
}
