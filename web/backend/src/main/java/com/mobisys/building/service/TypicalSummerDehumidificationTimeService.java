package com.mobisys.building.service;

import com.mobisys.building.entity.TypicalSummerAirconditionerTimeInfo;
import com.mobisys.building.entity.TypicalSummerDehumidificationTimeInfo;

import java.util.List;

public interface TypicalSummerDehumidificationTimeService {

    List<TypicalSummerDehumidificationTimeInfo> findTSDTById(int stationId);
    List<TypicalSummerDehumidificationTimeInfo> findTSDTByIT(int stationId,int type);
    boolean addTypicalSummerDehumidificationTime(TypicalSummerDehumidificationTimeInfo typicalSummerDehumidificationTimeInfo);
    boolean updateTypicalSummerDehumidificationTime(TypicalSummerDehumidificationTimeInfo typicalSummerDehumidificationTimeInfo);
}
