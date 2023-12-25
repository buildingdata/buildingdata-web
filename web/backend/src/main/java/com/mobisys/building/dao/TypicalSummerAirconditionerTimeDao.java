package com.mobisys.building.dao;

import com.mobisys.building.entity.TypicalSummerAirconditionerParamInfo;
import com.mobisys.building.entity.TypicalSummerAirconditionerTimeInfo;

import java.util.List;

public interface TypicalSummerAirconditionerTimeDao {
    List<TypicalSummerAirconditionerTimeInfo> queryTSATById(int id);
    List<TypicalSummerAirconditionerTimeInfo> queryTSATByIT(int stationId,int paramType);
    boolean insertTypicalSummerAirconditionerTime(TypicalSummerAirconditionerTimeInfo typicalSummerAirconditionerTimeInfo);
    boolean updateTypicalSummerAirconditionerTime(TypicalSummerAirconditionerTimeInfo typicalSummerAirconditionerTimeInfo);
}
