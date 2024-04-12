package com.mobisys.building.dao;

import com.mobisys.building.entity.SimultaneousParamInfo;
import org.apache.ibatis.annotations.Param;

import java.util.List;

public interface simultaneousDao {
    /**
     * 根据台站号查询同时发生参数
     */
    List<SimultaneousParamInfo> queryParamById(int id);
    /**
     * 将Excel表格中的数据导入到数据库中,一次导入多条数据
     */
    boolean insertSimultaneousParamList(@Param("simultaneousParamInfoList") List<SimultaneousParamInfo> simultaneousParamInfoList);
    boolean updateSimultaneousParamList(@Param("simultaneousParamInfoList") List<SimultaneousParamInfo> simultaneousParamInfoList);
    /**
     * 将Excel表格中的数据导入到数据库中,一次导入一条数据
     */
    boolean insertSimultaneousParam(SimultaneousParamInfo simultaneousParamInfo);
    boolean updateSimultaneousParam(SimultaneousParamInfo simultaneousParamInfo);
}
