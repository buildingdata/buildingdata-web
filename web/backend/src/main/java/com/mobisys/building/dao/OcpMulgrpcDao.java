package com.mobisys.building.dao;

import com.mobisys.building.entity.OcpMulgrpcInfo;
import com.mobisys.building.entity.OcpedidInfo;

import java.util.List;

public interface OcpMulgrpcDao {
    /**
     * 列出多不保证率及多参数组合的室外计算参数表中的信息
     * @return
     */
    List<OcpMulgrpcInfo> queryOcpMulgrpc();

    /**
     * 按照台站号查询多不保证率及多参数组合的室外计算参数表中的数据
     */
    OcpMulgrpcInfo queryOcpMulgrpcById(int id);
    /**
     * 导入Excel表中的数据
     */
    boolean insertOcpMulgrpc(OcpMulgrpcInfo ocpMulgrpcInfo);
    boolean updateOcpMulgrpc(OcpMulgrpcInfo ocpMulgrpcInfo);
}
