package com.mobisys.building.dao;

import com.mobisys.building.entity.TypicalSummerAirconditionerTimeInfo;
import com.mobisys.building.entity.TypicalSummerDehumidificationTimeInfo;

import java.util.List;

public interface TypicalSummerDehumidificationTimeDao {
    List<TypicalSummerDehumidificationTimeInfo> queryTSDTById(int id);
    List<TypicalSummerDehumidificationTimeInfo> queryTSDTByIT(int stationId, int paramType);
    boolean insertTypicalSummerDehumidificationTime(TypicalSummerDehumidificationTimeInfo typicalSummerDehumidificationTimeInfo);
    boolean updateTypicalSummerDehumidificationTime(TypicalSummerDehumidificationTimeInfo typicalSummerDehumidificationTimeInfo);
}
