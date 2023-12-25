package com.mobisys.building.service;
import com.mobisys.building.entity.FutureMeteoroLogicalInfo;

import java.util.List;
public interface FutureMeteoroLogicalService {
//    List<FutureMeteoroLogicalInfo> getFutureMeteoroLogicalById(int stationId);

    public List<FutureMeteoroLogicalInfo> getFutureInfo(int staionId,int month,int day,String type);
    List<FutureMeteoroLogicalInfo> getFuture45050InfoById(int stationId,int month,int day);

    List<FutureMeteoroLogicalInfo> getFuture45099InfoById(int stationId,int month,int day);

    List<FutureMeteoroLogicalInfo> getFuture85050InfoById(int stationId,int month,int day);

    List<FutureMeteoroLogicalInfo> getFuture85099InfoById(int stationId,int month,int day);
    boolean update_t_future_meteorological_p45_2050(FutureMeteoroLogicalInfo futureMeteoroLogicalInfo);
    boolean update_t_future_meteorological_p45_2099(FutureMeteoroLogicalInfo futureMeteoroLogicalInfo);
    boolean update_t_future_meteorological_p85_2050(FutureMeteoroLogicalInfo futureMeteoroLogicalInfo);
    boolean update_t_future_meteorological_p85_2099(FutureMeteoroLogicalInfo futureMeteoroLogicalInfo);

    boolean insert_t_future_meteorological_p45_2050(FutureMeteoroLogicalInfo futureMeteoroLogicalInfo);
    boolean insert_t_future_meteorological_p45_2099(FutureMeteoroLogicalInfo futureMeteoroLogicalInfo);
    boolean insert_t_future_meteorological_p85_2050(FutureMeteoroLogicalInfo futureMeteoroLogicalInfo);
    boolean insert_t_future_meteorological_p85_2099(FutureMeteoroLogicalInfo futureMeteoroLogicalInfo);
}
