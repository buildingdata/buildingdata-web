package com.mobisys.building.dao;



import com.mobisys.building.entity.OcpedidInfo;

import java.util.List;

public interface OcpedidDao {
    /**
     * 列出围护结构动态保温设计室外计算参数表中信息
     */
    List<OcpedidInfo> queryOcpedid();

    /**
     *按照站台号查询围护结构动态保温设计室外计算参数中的数据
     */
    List<OcpedidInfo> queryOcpedidById(int Id);
    List<OcpedidInfo> queryOcpedidByIT(int id, int time);

    /**
     * 将表格中的数据导入到数据库中
     */
    boolean insertOcpedid(OcpedidInfo ocpedidInfo);
    boolean updateOcpedid(OcpedidInfo ocpedidInfo);
}
