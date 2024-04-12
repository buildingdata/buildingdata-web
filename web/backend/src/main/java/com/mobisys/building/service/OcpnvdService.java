package com.mobisys.building.service;

import com.mobisys.building.entity.OcpnvdInfo;

import java.util.List;

public interface OcpnvdService {
    List<OcpnvdInfo> getOcpnvdList();

    OcpnvdInfo getOcpnvdById(int id);

    boolean addOcpnvd(OcpnvdInfo ocpnvdInfo);

    boolean updateOcpnvd(OcpnvdInfo ocpnvdInfo);
}
