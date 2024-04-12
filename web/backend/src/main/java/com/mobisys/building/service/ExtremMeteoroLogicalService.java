package com.mobisys.building.service;
import com.mobisys.building.entity.ExtremMeteoroLogicalInfo;
import org.apache.ibatis.annotations.Param;

import java.sql.Date;
import java.util.List;
public interface ExtremMeteoroLogicalService {
    /**
     * 通过台站号等信息查询空调负荷极端年的数据
     * @param stationId
     * @return
     */
    List<ExtremMeteoroLogicalInfo> getExtremMeteoroLogicalById(int stationId, Date day);

    /**
     * 通过台站号等信息查询室内过热极端年的数据
     * @param stationId
     * @return
     */
    List<ExtremMeteoroLogicalInfo> getExtremMeteoroLogicalInnerById(int stationId, Date day);

    boolean addExtrem(ExtremMeteoroLogicalInfo extremMeteoroLogicalInfo);
    /**
     * 批量导入空调负荷极端年的数据
     */
    boolean addExtremAirList(@Param("extremMeteoroLogicalInfoList") List<ExtremMeteoroLogicalInfo> extremMeteoroLogicalInfoList);
    /**
     * 批量导入室内过热极端年的数据
     */
    boolean addExtremInnerList(@Param("extremMeteoroLogicalInfoList") List<ExtremMeteoroLogicalInfo> extremMeteoroLogicalInfoList);



    boolean update_t_extreme_meteorological_inner(ExtremMeteoroLogicalInfo extremMeteoroLogicalInfo);
    boolean update_t_extreme_meteorological_air(ExtremMeteoroLogicalInfo extremMeteoroLogicalInfo);



}
