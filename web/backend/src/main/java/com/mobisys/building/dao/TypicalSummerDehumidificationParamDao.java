package com.mobisys.building.dao;

import com.mobisys.building.entity.TypicalSummerAirconditionerParamInfo;
import com.mobisys.building.entity.TypicalSummerDehumidificationParamInfo;

import java.util.List;

public interface TypicalSummerDehumidificationParamDao {
    List<TypicalSummerDehumidificationParamInfo> queryTSDPById(int id);
    boolean insertTypicalSummerDehumidificationParam(TypicalSummerDehumidificationParamInfo typicalSummerDehumidificationParamInfo);
    boolean updateTypicalSummerDehumidificationParam(TypicalSummerDehumidificationParamInfo typicalSummerDehumidificationParamInfo);
}
