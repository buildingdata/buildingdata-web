package com.mobisys.building.service.impl;

import com.mobisys.building.dao.TypWinAirTimeDao;
import com.mobisys.building.entity.TypWinAirTimeInfo;
import com.mobisys.building.service.TypWinAirTimeService;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.util.List;

@Service
public class TypWinAirTimeServiceImpl implements TypWinAirTimeService {
    @Resource
    private TypWinAirTimeDao typWinAirTimeDao;
    @Override
    public List<TypWinAirTimeInfo> getTypWinAirTimeList() {
        return typWinAirTimeDao.queryTypWinAirTime();
    }

    @Override
    public List<TypWinAirTimeInfo> getTypWinAirTimeById(int id) {
        return typWinAirTimeDao.queryTypWinAirTimeById(id);
    }
    @Override
    public List<TypWinAirTimeInfo> getTypWinAirTimeByIT(int id,int type) {
        return typWinAirTimeDao.queryTypWinAirTimeByIT(id,type);
    }

    @Override
    public boolean addTypWinAirTime(TypWinAirTimeInfo typWinAirTimeInfo) {
        return typWinAirTimeDao.insertTypWinAirTime(typWinAirTimeInfo);
    }
    @Override
    public boolean updateTypWinAirTime(TypWinAirTimeInfo typWinAirTimeInfo) {
        return typWinAirTimeDao.updateTypWinAirTime(typWinAirTimeInfo);
    }
}
