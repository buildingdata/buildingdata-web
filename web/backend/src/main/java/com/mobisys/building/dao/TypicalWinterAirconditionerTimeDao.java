package com.mobisys.building.dao;

import com.mobisys.building.entity.TypicalWinterAirconditionerTimeInfo;

import java.util.List;

public interface TypicalWinterAirconditionerTimeDao {
    List<TypicalWinterAirconditionerTimeInfo> queryTWATById(int id);
}
