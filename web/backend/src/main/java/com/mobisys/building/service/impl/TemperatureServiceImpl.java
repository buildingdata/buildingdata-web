package com.mobisys.building.service.impl;

import com.mobisys.building.dao.StationDao;
import com.mobisys.building.dao.TemperatureDao;
import com.mobisys.building.entity.StationInfo;
import com.mobisys.building.entity.TemperatureInfo;
import com.mobisys.building.service.TemperatureService;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.util.List;

@Service
public class TemperatureServiceImpl implements TemperatureService {
    @Resource
    private TemperatureDao temperatureDao;
    @Override
    public List<TemperatureInfo> getTemperatureById(int id) {
        return temperatureDao.queryTemperatureById(id);
    }
}
