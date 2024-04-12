package com.mobisys.building.service;


import com.mobisys.building.entity.TypicalSummerAirconditionerParamInfo;
import com.mobisys.building.entity.TypicalSummerDehumidificationParamInfo;

import java.util.List;

public interface TypicalSummerDehumidificationParamService {

    List<TypicalSummerDehumidificationParamInfo> findTSDPById(int stationId);
    boolean addTypicalSummerDehumidificationParam(TypicalSummerDehumidificationParamInfo typicalSummerDehumidificationParamInfo);
    boolean updateTypicalSummerDehumidificationParam(TypicalSummerDehumidificationParamInfo typicalSummerDehumidificationParamInfo);
}
