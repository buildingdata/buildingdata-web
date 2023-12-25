package com.mobisys.building.service;
import com.mobisys.building.entity.TypicalMeteoroLogicalInfo;
import org.apache.ibatis.annotations.Param;

import java.util.List;
import java.util.Map;

public interface TypicalMeteoroLogicalService {
    Map<String,List<Map<String,List<Double>>>> getTypicalMeteoroLogicalById(int stationId);

    boolean addTypical(TypicalMeteoroLogicalInfo typicalMeteoroLogicalInfo);
    boolean addTypicalList10(@Param("typicalMeteoroLogicalInfolist") List<TypicalMeteoroLogicalInfo> typicalMeteoroLogicalInfolist);
}
