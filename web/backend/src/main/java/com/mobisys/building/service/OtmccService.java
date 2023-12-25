package com.mobisys.building.service;

import com.mobisys.building.entity.OcpedidInfo;
import com.mobisys.building.entity.OtmccInfo;

import java.util.List;

public interface OtmccService {
    List<OtmccInfo> getOtmccList();

    List<OtmccInfo> getOtmccById(int id);
    OtmccInfo getOtmccByIT(int id, int time);


    boolean addOtmcc(OtmccInfo otmccInfo);
    boolean updateOtmcc(OtmccInfo otmccInfo);
}
