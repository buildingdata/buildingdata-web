package com.mobisys.building.dao;

import com.mobisys.building.entity.OcpnvdInfo;

import java.util.List;

public interface OcpnvdDao {
    /**
     * 列出自然通风设计室外计算参数表中信息
     */
    List<OcpnvdInfo> queryOcpnvd();

    /**
     * 按照站台号查找自然通风设计室外计算参数表中的数据
     */
    OcpnvdInfo queryOcpnvdById(int Id);

    boolean insertOcpnvd(OcpnvdInfo ocpnvdInfo);

    boolean updateOcpnvd(OcpnvdInfo ocpnvdInfo);

}
