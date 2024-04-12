package com.mobisys.building.service;

import com.mobisys.building.entity.OcpMulgrpcInfo;

import java.util.List;

public interface OcpMulgrpcService {
    List<OcpMulgrpcInfo> getOcpMulgrpcList();

    OcpMulgrpcInfo getOcpMulgrpcById(int id);
    boolean insertOcpMulgrpc(OcpMulgrpcInfo ocpMulgrpcInfo);
    boolean updateOcpMulgrpc(OcpMulgrpcInfo ocpMulgrpcInfo);
}
