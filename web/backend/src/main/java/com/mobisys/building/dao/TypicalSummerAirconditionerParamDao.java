package com.mobisys.building.dao;

import com.mobisys.building.entity.TypWinAirParamInfo;
import com.mobisys.building.entity.TypicalSummerAirconditionerParamInfo;
import com.mobisys.building.entity.TypicalWinterAirconditionerParamInfo;

import java.util.List;

public interface TypicalSummerAirconditionerParamDao {
    List<TypicalSummerAirconditionerParamInfo> queryTSAPById(int id);
    boolean insertTypicalSummerAirconditionerParam(TypicalSummerAirconditionerParamInfo typicalSummerAirconditionerParamInfo);
    boolean updateTypicalSummerAirconditionerParam(TypicalSummerAirconditionerParamInfo typicalSummerAirconditionerParamInfo);
}
