package com.mobisys.building.dao;

import com.mobisys.building.entity.StationInfo;

import java.util.List;

public interface StationDao {
    /**
     * 列出建筑遮阳设计室外计算参数表中信息
     */
    List<StationInfo> queryStation();

    /**
     * 按城市ID查找建筑遮阳设计室外计算参数信息
     */
    StationInfo queryStationById(int id);

    /**
     * 插入台站信息
     */
    boolean insertStation(StationInfo stationInfo);

    /**
     * 获取所有省份名
     */
    List<String> queryAllProvince();

    /**
     * 获取省份下的所有城市
     */
    List<String> queryCityInProvince(String province);

    /**
     * 获取城市下的所有站点
     */
    List<String> queryStationInCity(String city);

    /*
    * 获取站点下的所有详情信息，包括经度、维度、海拔、气候区属
    * */
    StationInfo queryStationinfo(int stationid);

    /**
     * 按照台站等级查询台站信息(等级可为1,2,3级)
     */
    List<StationInfo> queryStationByLevel(int level);
    /**
     * 根据城市名模糊查询
     */
    List< StationInfo> queryStationFZ (String city);
    /**
     * 根据台站号模糊查询
     */
    List< StationInfo> getStationInId(int station);

}
