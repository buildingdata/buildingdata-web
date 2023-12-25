package com.mobisys.building.dao;
import com.mobisys.building.entity.FutureMeteoroLogicalInfo;
import org.apache.ibatis.annotations.Param;

import java.util.List;
public interface FutureMeteoroLogicalDao {
    /*
     * 根据台站号查询未来气象年参数
     * */
//    List<FutureMeteoroLogicalInfo> queryFutureMeteoroLogicalById(int id);

    List<FutureMeteoroLogicalInfo> queryFuture45050ById(@Param("stationId") int id,@Param("month") int month,@Param("day") int day);
    List<FutureMeteoroLogicalInfo> queryFuture45099ById(@Param("stationId") int id,@Param("month") int month,@Param("day") int day);
    List<FutureMeteoroLogicalInfo> queryFuture85050ById(@Param("stationId") int id,@Param("month") int month,@Param("day") int day);
    List<FutureMeteoroLogicalInfo> queryFuture85099ById(@Param("stationId") int id,@Param("month") int month,@Param("day") int day);

    boolean update_t_future_meteorological_p45_2050(FutureMeteoroLogicalInfo futureMeteoroLogicalInfo);
    boolean update_t_future_meteorological_p45_2099(FutureMeteoroLogicalInfo futureMeteoroLogicalInfo);
    boolean update_t_future_meteorological_p85_2050(FutureMeteoroLogicalInfo futureMeteoroLogicalInfo);
    boolean update_t_future_meteorological_p85_2099(FutureMeteoroLogicalInfo futureMeteoroLogicalInfo);


    boolean insert_t_future_meteorological_p45_2050(FutureMeteoroLogicalInfo futureMeteoroLogicalInfo);
    boolean insert_t_future_meteorological_p45_2099(FutureMeteoroLogicalInfo futureMeteoroLogicalInfo);
    boolean insert_t_future_meteorological_p85_2050(FutureMeteoroLogicalInfo futureMeteoroLogicalInfo);
    boolean insert_t_future_meteorological_p85_2099(FutureMeteoroLogicalInfo futureMeteoroLogicalInfo);

}
