package com.mobisys.building.service;


import com.mobisys.building.entity.TypWinAirParamInfo;
import com.mobisys.building.entity.TypicalSummerAirconditionerParamInfo;

import java.util.List;

public interface TypicalSummerAirconditionerParamService {

    List<TypicalSummerAirconditionerParamInfo> findTSAPById(int stationId);

    boolean addTypicalSummerAirconditionerParam(TypicalSummerAirconditionerParamInfo typicalSummerAirconditionerParamInfo);
    boolean updateTypicalSummerAirconditionerParam(TypicalSummerAirconditionerParamInfo typicalSummerAirconditionerParamInfo);
}
