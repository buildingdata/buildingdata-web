package com.mobisys.building.service;

import com.mobisys.building.entity.BbcWdrwspInfo;

import java.util.List;

public interface BbcWdrwspService {
    List<BbcWdrwspInfo> getBbcWdrwspsById(int stationId);
}
