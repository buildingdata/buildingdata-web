package com.mobisys.building.dao;

import com.mobisys.building.entity.industryWarmNewWindInfo;

import java.util.List;
public interface industryWarmNewWindDao {
    /**
     * 按照站台号查找工业建筑供暖通风与空气调节设计规范附表参数中的数据
     */
    List<industryWarmNewWindInfo> queryindustryWarmNewWindById(int id);

}
