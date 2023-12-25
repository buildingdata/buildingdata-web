package com.mobisys.building.service.impl;

import com.mobisys.building.dao.TypWinHeatParamDao;
import com.mobisys.building.entity.TypWinHeatParamInfo;
import com.mobisys.building.entity.TypWinHeatTimeInfo;
import com.mobisys.building.service.TypWinHeatParamService;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.util.List;
@Service
public class TypWinHeatParamServiceImpl implements TypWinHeatParamService {
    @Resource
    private TypWinHeatParamDao typWinHeatParamDao;
    @Override
    public List<TypWinHeatParamInfo> getTypWinHeatParamList() {
        return typWinHeatParamDao.queryTypWinHeatParam();
    }

    @Override
    public TypWinHeatParamInfo getTypWinHeatParamById(int id) {
        return typWinHeatParamDao.queryTypWinHeatParamById(id);
    }

    @Override
    public boolean addTypWinHeatParam(TypWinHeatParamInfo typWinHeatParamInfo) {
        return typWinHeatParamDao.insertTypWinHeatParam(typWinHeatParamInfo);
    }
    @Override
    public boolean updateTypWinHeatParam(TypWinHeatParamInfo typWinHeatParamInfo) {
        return typWinHeatParamDao.updateTypWinHeatParam(typWinHeatParamInfo);
    }
}
