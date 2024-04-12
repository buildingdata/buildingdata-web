package com.mobisys.building.dao;

import com.mobisys.building.entity.TypicalWinterAirconditionerParamInfo;

import java.util.List;

public interface TypicalWinterAirconditionerParamDao {
    List<TypicalWinterAirconditionerParamInfo> queryTWAPById(int id);
}
