package com.mobisys.building.service;

import com.mobisys.building.entity.SimultaneousParamInfo;
import org.apache.ibatis.annotations.Param;

import java.util.List;

public interface simultaneousParamService {

    List<SimultaneousParamInfo> getSimuParamById(int stationId);
    boolean addSimultaneousParamList(@Param("simultaneousParamInfoList") List<SimultaneousParamInfo> simultaneousParamInfoList);
    boolean addSimultaneousParam(SimultaneousParamInfo simultaneousParamInfo);
    boolean updateSimultaneousParamList(@Param("simultaneousParamInfoList") List<SimultaneousParamInfo> simultaneousParamInfoList);
    boolean updateSimultaneousParam(SimultaneousParamInfo simultaneousParamInfo);
}
