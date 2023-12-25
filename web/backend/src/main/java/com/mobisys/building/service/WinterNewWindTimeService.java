package com.mobisys.building.service;
import com.mobisys.building.entity.TypWinAirTimeInfo;
import com.mobisys.building.entity.WinterNewWindTimeInfo;

import java.util.List;
public interface WinterNewWindTimeService {
    /*
     * 根据台站号获取夏季新风参数
     * */
    List<WinterNewWindTimeInfo> getWinterNewWindTimeById(int id);
    List<WinterNewWindTimeInfo> getWinterNewWindTimeByIT(int id, int type);
    boolean addWinterNewWindTime(WinterNewWindTimeInfo winterNewWindTimeInfo);
    boolean updateWinterNewWindTime(WinterNewWindTimeInfo winterNewWindTimeInfo);
}
