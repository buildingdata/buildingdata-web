package com.mobisys.building.service;

import com.mobisys.building.entity.StationInfo;

import java.util.List;

public interface StationService {
    List<StationInfo> getStationList();

    StationInfo getStationById(int id);

    boolean addStation(StationInfo stationInfo);

    /**
     * 获取所有省份信息
     */
    List<String> getAllProvinces();

    /**
     * 获取省份下的所有城市信息
     */
    List<String> getCitysInProvince(String province);

    /**
     * 获取城市下的所有站点信息
     */
    List<String> getStationsInCity(String city);

    /*
    * 获取站点的详细信息，包括经度、维度、海拔和气候区属
    * */
    StationInfo getStationsinfo(int stationid);

    /**
     * 按照台站等级查询台站号信息（等级分为1,2,3级）
     */
    List<StationInfo> getStationByLevel(int level);
    /**
     * 根据城市名模糊查询
     */
    List< StationInfo> getStationInFZCity(String city);
    /**
     * 根据台站号模糊查询
     */
    List< StationInfo> getStationInId(int station);
}
