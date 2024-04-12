package com.mobisys.building.dao;

import com.mobisys.building.entity.IndoorDesignParamInfo;

import java.util.List;

public interface IndoorDesignParamDao {

    /**
     * 列出暖通空调室内设计参数表中信息
     */
    List<IndoorDesignParamInfo> queryIndoorDesignParam();

    boolean update_iddp(IndoorDesignParamInfo indoorDesignParamInfo);


}
