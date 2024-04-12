package com.mobisys.building.service.impl;

import com.mobisys.building.dao.WinterNewWindTimeDao;
import com.mobisys.building.entity.TypWinAirTimeInfo;
import com.mobisys.building.entity.WinterNewWindTimeInfo;
import com.mobisys.building.service.WinterNewWindTimeService;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.util.List;

@Service
public class WinterNewWindTimeImpl implements WinterNewWindTimeService{
    @Resource
    private WinterNewWindTimeDao winterNewWindTimeDao;

    @Override
    public List<WinterNewWindTimeInfo> getWinterNewWindTimeById(int id) {
        return winterNewWindTimeDao.querywinterNewWindTimeById(id);
    }
    @Override
    public List<WinterNewWindTimeInfo> getWinterNewWindTimeByIT(int id,int type) {
        return winterNewWindTimeDao.querywinterNewWindTimeByIT(id,type);
    }
    @Override
    public boolean addWinterNewWindTime(WinterNewWindTimeInfo winterNewWindTimeInfo) {
        return winterNewWindTimeDao.insertWinterNewWindTime(winterNewWindTimeInfo);
    }
    @Override
    public boolean updateWinterNewWindTime(WinterNewWindTimeInfo winterNewWindTimeInfo) {
        return winterNewWindTimeDao.updateWinterNewWindTime(winterNewWindTimeInfo);
    }
}
