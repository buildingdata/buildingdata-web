package com.mobisys.building.dao;

import com.mobisys.building.entity.OcpedidInfo;
import com.mobisys.building.entity.OcpehhccInfo;
import org.apache.ibatis.annotations.Param;

import java.util.List;

public interface OcpehhccDao {
    /**
     * 列出围护结构热湿耦合计算室外计算参数表中信息
     */
    List<OcpehhccInfo> queryOcpehhcc();

    /**
     * 按照站台号查找围护结构热湿耦合计算室外计算参数表中的数据
     */
    List<OcpehhccInfo> queryOcpehhccById(int stationId);
    List<OcpehhccInfo> queryOcpehhccByIT(int stationId,int month,int day,int time);

    /**
     * 插入围护结构热湿耦合计算室外计算参数
     * @param ocpehhccInfo
     * @return
     */
    boolean insertOcpehhcc(OcpehhccInfo ocpehhccInfo);
    boolean updateOcpehhcc(OcpehhccInfo ocpehhccInfo);

    /**
     * 批量插入围护结构热湿耦合计算室外计算参数
     * @param ocpehhccInfoList
     * @return
     */
    boolean insertOcpehhccList(@Param("ocpehhccInfoList")List<OcpehhccInfo> ocpehhccInfoList);
}
