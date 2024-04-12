package com.mobisys.building.service;

import com.mobisys.building.entity.TypicalWinterAirconditionerTimeInfo;

import java.util.List;

public interface TypicalWinterAirconditionerTimeService {

    List<TypicalWinterAirconditionerTimeInfo> findTWATById(int stationId);
}
