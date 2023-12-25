package com.mobisys.building.service.impl;

import com.mobisys.building.dao.StationDao;
import com.mobisys.building.entity.StationInfo;
import com.mobisys.building.service.StationService;
import org.openxmlformats.schemas.wordprocessingml.x2006.main.STTabJc;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.util.List;

@Service
public class StationServiceImpl implements StationService {
    @Resource
    private StationDao stationDao;

    @Override
    public List<StationInfo> getStationList() {
        return stationDao.queryStation();
    }

    @Override
    public StationInfo getStationById(int id) {
        return stationDao.queryStationById(id);
    }

    @Override
    public boolean addStation(StationInfo stationInfo) {
        return stationDao.insertStation(stationInfo);
    }

    @Override
    public List<String> getAllProvinces() {
        return stationDao.queryAllProvince();
    }

    @Override
    public List<String> getCitysInProvince(String province) {
        return stationDao.queryCityInProvince(province);
    }

    @Override
    public List<String> getStationsInCity(String city) {
        return stationDao.queryStationInCity(city);
    }

    @Override
    public StationInfo getStationsinfo(int stationid){return stationDao.queryStationinfo(stationid);}

    @Override
    public List<StationInfo> getStationByLevel(int level) {
        return stationDao.queryStationByLevel(level);
    }

    @Override
    public List< StationInfo> getStationInFZCity(String city) {
        return stationDao.queryStationFZ(city);
    }

    @Override
    public List< StationInfo> getStationInId(int station) {
        return stationDao.getStationInId(station);
    }
}
