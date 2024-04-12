package com.mobisys.building.service.impl;

import com.mobisys.building.dao.TypWinAirParamDao;
import com.mobisys.building.entity.TypWinAirParamInfo;
import com.mobisys.building.entity.TypWinHeatTimeInfo;
import com.mobisys.building.service.TypWinAirParamService;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.util.List;

@Service
public class TypWinAirParamServiceImpl implements TypWinAirParamService {
    @Resource
    private TypWinAirParamDao typWinAirParamDao;
    @Override
    public List<TypWinAirParamInfo> getTypWinAirParamList(int id) {
        return typWinAirParamDao.queryTypWinAirParam();
    }

    @Override
    public TypWinAirParamInfo getTypWinAirParamById(int id) {
        return typWinAirParamDao.queryTypWinAirParamById(id);
    }

    @Override
    public boolean addTypWinAirParam(TypWinAirParamInfo typWinAirParamInfo) {
        return typWinAirParamDao.insertTypWinAirParam(typWinAirParamInfo);
    }
    @Override
    public boolean updateTypWinAirParam(TypWinAirParamInfo typWinAirParamInfo) {
        return typWinAirParamDao.updateTypWinAirParam(typWinAirParamInfo);
    }
}
