package com.mobisys.building.dao;

import com.mobisys.building.entity.OcpedidInfo;
import com.mobisys.building.entity.indoorHotInfo;

import java.util.List;

public interface indoorHotDao {
    List<indoorHotInfo> query();

    /**
     * 将表格中的数据导入到数据库中
     */

    boolean update_t_indoor_thermal_classification(indoorHotInfo indoorHotInfo);
}
