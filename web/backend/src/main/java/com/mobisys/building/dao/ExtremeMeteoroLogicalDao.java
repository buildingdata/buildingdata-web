package com.mobisys.building.dao;
import com.mobisys.building.entity.ExtremMeteoroLogicalInfo;
import org.apache.ibatis.annotations.Param;

import java.sql.Date;
import java.util.List;
public interface ExtremeMeteoroLogicalDao {
    /*
    * 根据台站号查询空调负荷极端气象年参数
    * */

    List<ExtremMeteoroLogicalInfo> queryExtremMeteoroLogicalById(@Param("stationId") int id,@Param("month") Integer month,Integer day);

    /**
     * 根据台站号查询室内过热极端气象年数据
     * @param id
     * @return
     */
    List<ExtremMeteoroLogicalInfo> queryExtremMeteoroLogicalInnerById(@Param("stationId") int id,@Param("month") Integer month,Integer day);

    /**
     * 一次插入一条数据
     * @param extremMeteoroLogicalInfo
     * @return
     */
    boolean insertExtrem(ExtremMeteoroLogicalInfo extremMeteoroLogicalInfo);

    /**
     * 空调负荷数据
     * @param extremMeteoroLogicalInfoList
     * @return
     */
    boolean insertExtremAirList(@Param("extremMeteoroLogicalInfoList") List<ExtremMeteoroLogicalInfo> extremMeteoroLogicalInfoList);

    /**
     * 室内过热数据
     * @param extremMeteoroLogicalInfoList
     * @return
     */
    boolean insertExtremInnerList(@Param("extremMeteoroLogicalInfoList") List<ExtremMeteoroLogicalInfo> extremMeteoroLogicalInfoList);


    boolean update_t_extreme_meteorological_inner(ExtremMeteoroLogicalInfo extremMeteoroLogicalInfo);
    boolean update_t_extreme_meteorological_air(ExtremMeteoroLogicalInfo extremMeteoroLogicalInfo);



}
