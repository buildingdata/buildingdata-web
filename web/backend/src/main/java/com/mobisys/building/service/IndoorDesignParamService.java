package com.mobisys.building.service;

import com.mobisys.building.entity.IndoorDesignParamInfo;

import java.util.List;

public interface IndoorDesignParamService {

    List<IndoorDesignParamInfo> getIndoorDesignParam();

    boolean update_iddp(IndoorDesignParamInfo indoorDesignParamInfo);

}
