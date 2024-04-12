package com.mobisys.building.service;


import com.mobisys.building.entity.TypicalWinterAirconditionerParamInfo;

import java.util.List;

public interface TypicalWinterAirconditionerParamService {

    List<TypicalWinterAirconditionerParamInfo> findTWAPById(int stationId);
}
