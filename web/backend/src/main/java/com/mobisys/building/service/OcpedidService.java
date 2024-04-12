package com.mobisys.building.service;

import com.mobisys.building.entity.OcpedidInfo;
import com.mobisys.building.entity.OcpnvdInfo;

import java.util.List;

public interface OcpedidService {
    /**
     * 进行对围护结构动态保温设计室外计算参数表的查询的操作
     */
    List<OcpedidInfo> getOcpedidList();

    /**
     *进行按照站台号进行查询围护结构动态保温设计室外计算参数表的数据的操作
     */
    List<OcpedidInfo> getOcpedidById(int id);
    OcpedidInfo getOcpedidByIT(int id,int time);

    /**
     * 将表格中的数据插入到数据库中
     */


    boolean addOcpedid(OcpedidInfo ocpedidInfo);

    boolean updateOcpedid(OcpedidInfo ocpedidInfo);
}
