package com.mobisys.building.service.impl;

import com.mobisys.building.dao.TypWinHeatTimeDao;
import com.mobisys.building.entity.OcpedidInfo;
import com.mobisys.building.entity.TypWinHeatTimeInfo;
import com.mobisys.building.service.TypWinHeatTimeService;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.util.List;

@Service
public class TypWinHeatTimeServiceImpl implements TypWinHeatTimeService {
    @Resource
    private TypWinHeatTimeDao typWinHeatTimeDao;

    @Override
    public List<TypWinHeatTimeInfo> getTypWinHeatTimeList() {
        return typWinHeatTimeDao.queryTypWinHeatTime();
    }


    @Override
    public List<TypWinHeatTimeInfo> getTypWinHeatTimeById(int id) {
        return typWinHeatTimeDao.queryTypWinHeatTimeById(id);
    }
    @Override
    public List<TypWinHeatTimeInfo> getTypWinHeatTimeByIT(int id,int type) {
        return typWinHeatTimeDao.queryTypWinHeatTimeByIT(id,type);
    }

    @Override
    public boolean addTypWinHeatTime(TypWinHeatTimeInfo typWinHeatTimeInfo) {
        return typWinHeatTimeDao.insertTypWinHeatTime(typWinHeatTimeInfo);
    }
    @Override
    public boolean updateTypWinHeatTime(TypWinHeatTimeInfo typWinHeatTimeInfo) {
        return typWinHeatTimeDao.updateTypWinHeatTime(typWinHeatTimeInfo);
    }
}
