package com.mobisys.building.service;

import com.mobisys.building.entity.TypicalSummerAirconditionerParamInfo;
import com.mobisys.building.entity.TypicalSummerAirconditionerTimeInfo;
import com.mobisys.building.entity.TypicalWinterAirconditionerTimeInfo;

import java.util.List;

public interface TypicalSummerAirconditionerTimeService {

    List<TypicalSummerAirconditionerTimeInfo> findTSATById(int stationId);
    List<TypicalSummerAirconditionerTimeInfo> findTSATByIT(int stationId,int type);
    boolean addTypicalSummerAirconditionerTime(TypicalSummerAirconditionerTimeInfo typicalSummerAirconditionerTimeInfo);
    boolean updateTypicalSummerAirconditionerTime(TypicalSummerAirconditionerTimeInfo typicalSummerAirconditionerTimeInfo);

}
